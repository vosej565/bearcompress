import React, { useState, useCallback, useEffect } from 'react';
import { Upload, Download, X, Loader2, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';

const ConvertPdf = () => {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [targetFormat, setTargetFormat] = useState('image/jpeg');
  const [selectedPages, setSelectedPages] = useState(new Set());
  const { toast } = useToast();

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = useCallback(async (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF file.',
        variant: 'destructive',
      });
      return;
    }

    setFile(selectedFile);
    setPages([]);
    setSelectedPages(new Set());
    setIsProcessing(true);
    toast({ title: 'Processing PDF...', description: 'Please wait while we prepare the pages.' });

    try {
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        const pageThumbnails = [];
        const initialSelected = new Set();

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 0.3 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport }).promise;
          pageThumbnails.push({
            num: i,
            thumbnail: canvas.toDataURL(),
            pdfPage: page,
          });
          initialSelected.add(i);
        }
        setPages(pageThumbnails);
        setSelectedPages(initialSelected);
        toast({ title: 'PDF processed!', description: `${pdf.numPages} pages are ready for conversion.` });
      };
      fileReader.readAsArrayBuffer(selectedFile);
    } catch (error) {
      console.error(error);
      toast({ title: 'Error processing PDF', description: 'The file might be corrupted or unsupported.', variant: 'destructive' });
      handleRemove();
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    processFile(droppedFile);
  }, [processFile]);

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
    e.target.value = '';
  };

  const handleRemove = () => {
    setFile(null);
    setPages([]);
    setSelectedPages(new Set());
  };

  const togglePageSelection = (pageNum) => {
    setSelectedPages(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(pageNum)) {
        newSelection.delete(pageNum);
      } else {
        newSelection.add(pageNum);
      }
      return newSelection;
    });
  };
  
  const toggleSelectAll = () => {
    if (selectedPages.size === pages.length) {
      setSelectedPages(new Set());
    } else {
      setSelectedPages(new Set(pages.map(p => p.num)));
    }
  };

  const generateImage = async (page, format) => {
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context, viewport }).promise;
    return canvas.toDataURL(format, 0.92);
  };
  
  const handleDownloadPage = async (page) => {
    try {
      const imageDataUrl = await generateImage(page.pdfPage, targetFormat);
      const a = document.createElement('a');
      const extension = targetFormat.split('/')[1];
      a.href = imageDataUrl;
      a.download = `${file.name.replace(/\.pdf$/i, '')}-page-${page.num}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      toast({ title: 'Download Failed', description: 'Could not generate image for download.', variant: 'destructive'});
    }
  };

  const handleBulkDownload = async () => {
    if (selectedPages.size === 0) {
      toast({ title: 'No pages selected', description: 'Please select at least one page to download.', variant: 'destructive'});
      return;
    }
    
    setIsDownloading(true);
    toast({ title: 'Creating ZIP...', description: `Packaging ${selectedPages.size} pages. Please wait.` });

    try {
      const zip = new JSZip();
      const extension = targetFormat.split('/')[1];
      const baseName = file.name.replace(/\.pdf$/i, '');
      
      const selectedPageObjects = pages.filter(p => selectedPages.has(p.num));

      for (const page of selectedPageObjects) {
        const imageDataUrl = await generateImage(page.pdfPage, targetFormat);
        const imageBlob = await (await fetch(imageDataUrl)).blob();
        zip.file(`${baseName}-page-${page.num}.${extension}`, imageBlob);
      }
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${baseName}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      toast({ title: 'ZIP Creation Failed', description: 'An error occurred while creating the ZIP file.', variant: 'destructive' });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-8">
      {!file && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-full h-96 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl shadow-sm transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
          }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-14 h-14 mb-4 text-blue-500 animate-spin" />
              <h3 className="text-2xl font-semibold text-gray-700">Processing PDF...</h3>
            </>
          ) : (
            <>
              <Upload className="w-14 h-14 mb-4 text-gray-400" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Drop Your PDF File Here</h3>
              <p className="text-gray-500 mb-6">or</p>
              <label htmlFor="pdf-file-upload" className="cursor-pointer">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl h-16 px-10" asChild>
                  <span>Select File</span>
                </Button>
                <input
                  id="pdf-file-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
              <p className="absolute bottom-6 text-sm text-gray-500">Supports PDF</p>
            </>
          )}
        </div>
      )}

      {file && pages.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">{pages.length} pages</p>
                </div>
              </div>
              <Button onClick={handleRemove} variant="outline" size="icon">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Convert to:</label>
                    <div className="flex gap-2">
                        <Button onClick={() => setTargetFormat('image/jpeg')} variant={targetFormat === 'image/jpeg' ? 'default' : 'outline'} size="sm" className={targetFormat === 'image/jpeg' ? 'bg-blue-600 hover:bg-blue-700' : ''}>JPG</Button>
                        <Button onClick={() => setTargetFormat('image/png')} variant={targetFormat === 'image/png' ? 'default' : 'outline'} size="sm" className={targetFormat === 'image/png' ? 'bg-blue-600 hover:bg-blue-700' : ''}>PNG</Button>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                   <Button onClick={toggleSelectAll} variant="outline" size="sm">
                     {selectedPages.size === pages.length ? 'Deselect All' : 'Select All'} ({selectedPages.size})
                   </Button>
                  <Button onClick={handleBulkDownload} className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isDownloading || selectedPages.size === 0}>
                    {isDownloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                    Download ZIP
                  </Button>
                </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {pages.map(page => (
                <div key={page.num} className="relative group cursor-pointer" onClick={() => togglePageSelection(page.num)}>
                  <div className={`border-2 rounded-lg overflow-hidden transition-all ${selectedPages.has(page.num) ? 'border-blue-600 shadow-lg' : 'border-gray-200'}`}>
                    <img src={page.thumbnail} alt={`Page ${page.num}`} className="w-full h-auto" />
                    <div className="absolute top-2 right-2 bg-white rounded-full p-0.5">
                       {selectedPages.has(page.num) ? <CheckCircle2 className="w-5 h-5 text-blue-600" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-400 group-hover:border-blue-500"></div>}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm font-medium text-gray-700">Page {page.num}</p>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); handleDownloadPage(page); }}>
                      <Download className="w-4 h-4 text-gray-500 hover:text-blue-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConvertPdf;