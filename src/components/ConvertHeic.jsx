import React, { useState, useCallback } from 'react';
import { Upload, Download, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import heic2any from 'heic2any';

const ConvertHeic = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(null); // holds id of file being converted
  const { toast } = useToast();

  const handleDragOver = useCallback(e => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(e => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFiles = useCallback(fileList => {
    const validFiles = Array.from(fileList).filter(file => {
      const isValid = file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif');
      if (!isValid) {
        toast({
          title: 'Invalid file type',
          description: `${file.name} is not a HEIC/HEIF file.`,
          variant: 'destructive',
        });
      }
      return isValid;
    });

    if (validFiles.length === 0) return;

    const newFiles = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      original: file,
      targetFormat: 'image/jpeg', // Default format
      converted: null,
      convertedPreview: null,
    }));

    setFiles(prev => [...prev, ...newFiles]);
  }, [toast]);

  const handleDrop = useCallback(async e => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    processFiles(droppedFiles);
  }, [processFiles]);

  const handleFileInput = async e => {
    const selectedFiles = e.target.files;
    processFiles(selectedFiles);
    e.target.value = '';
  };

  const handleFormatChange = (id, format) => {
    setFiles(prev =>
      prev.map(file => {
        if (file.id === id) {
          if (file.convertedPreview) URL.revokeObjectURL(file.convertedPreview);
          return {
            ...file,
            targetFormat: format,
            converted: null,
            convertedPreview: null,
          };
        }
        return file;
      })
    );
  };

  const handleConvert = async id => {
    const file = files.find(f => f.id === id);
    if (!file) return;

    setIsConverting(id);
    try {
      const conversionResult = await heic2any({
        blob: file.original,
        toType: file.targetFormat,
        quality: 0.92,
      });
      
      const convertedBlob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;

      setFiles(prev =>
        prev.map(f => {
          if (f.id === id) {
            if (f.convertedPreview) URL.revokeObjectURL(f.convertedPreview);
            return {
              ...f,
              converted: convertedBlob,
              convertedPreview: URL.createObjectURL(convertedBlob),
            };
          }
          return f;
        })
      );
      toast({
        title: 'Success!',
        description: 'Image converted successfully.',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Conversion failed',
        description: error.message || 'Failed to convert HEIC image. The file may be unsupported or corrupted.',
        variant: 'destructive',
      });
    } finally {
      setIsConverting(null);
    }
  };

    const handleDownload = file => {
    if (!file.converted) return;
    const url = URL.createObjectURL(file.converted);
    const a = document.createElement('a');
    a.href = url;
    const handleDownload = file => {
  if (!file.converted) return;

  const url = URL.createObjectURL(file.converted);
  const a = document.createElement('a');
  a.href = url;

  let extension = file.targetFormat.split('/')[1];
  if (extension === 'jpeg') extension = 'jpg'; //  JPG 강제 적용

  const baseName = file.original.name.replace(/\.(heic|heif)$/i, '');
  a.download = `${baseName}.${extension}`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
};

    document.body.appendChild(a);
a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRemove = id => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file && file.convertedPreview) {
        URL.revokeObjectURL(file.convertedPreview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const getFormatExtension = format => {
    if (format.startsWith('image/')) {
        return format.split('/')[1].toUpperCase();
    }
    return format.toUpperCase();
  };

  return (
    <div className="space-y-8">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full h-96 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl shadow-sm transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
        }`}
      >
        <Upload className="w-14 h-14 mb-4 text-gray-400" />
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Drop Your HEIC/HEIF Files Here</h3>
        <p className="text-gray-500 mb-6">or</p>
        <label htmlFor="heic-file-upload" className="cursor-pointer">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl h-16 px-10" asChild>
            <span>Select Files</span>
          </Button>
          <input
            id="heic-file-upload"
            type="file"
            multiple
            accept=".heic,.heif,image/heic,image/heif"
            onChange={handleFileInput}
            className="hidden"
          />
        </label>
        <p className="absolute bottom-6 text-sm text-gray-500">
          Supports HEIC, HEIF
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Images to Convert ({files.length})
          </h3>

          <div className="grid gap-4">
            {files.map(file => (
              <div key={file.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-2">Original</p>
                      <div className="w-24 h-24 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-bold">HEIC</span>
                      </div>
                       <p className="text-xs text-gray-600 mt-1">
                        HEIC/HEIF
                      </p>
                    </div>
                    {file.convertedPreview && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-2">Converted</p>
                        <img src={file.convertedPreview} alt="Converted" className="w-24 h-24 object-cover rounded border border-gray-200" />
                        <p className="text-xs text-gray-600 mt-1">
                          {getFormatExtension(file.targetFormat)}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate mb-3">
                      {file.original.name}
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Convert to:
                        </label>
                        <div className="flex gap-2 flex-wrap">
                          <Button onClick={() => handleFormatChange(file.id, 'image/jpeg')} variant={file.targetFormat === 'image/jpeg' ? 'default' : 'outline'} size="sm" className={file.targetFormat === 'image/jpeg' ? 'bg-blue-600 hover:bg-blue-700' : ''}>
                            JPG
                          </Button>
                          <Button onClick={() => handleFormatChange(file.id, 'image/png')} variant={file.targetFormat === 'image/png' ? 'default' : 'outline'} size="sm" className={file.targetFormat === 'image/png' ? 'bg-blue-600 hover:bg-blue-700' : ''}>
                            PNG
                          </Button>
                          <Button onClick={() => handleFormatChange(file.id, 'image/webp')} variant={file.targetFormat === 'image/webp' ? 'default' : 'outline'} size="sm" className={file.targetFormat === 'image/webp' ? 'bg-blue-600 hover:bg-blue-700' : ''}>
                            WebP
                          </Button>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button onClick={() => handleConvert(file.id)} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm" disabled={isConverting === file.id}>
                          {isConverting === file.id ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                          {isConverting === file.id ? 'Converting...' : 'Convert'}
                        </Button>
                        {file.converted && (
                          <Button onClick={() => handleDownload(file)} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => handleRemove(file.id)} variant="outline" size="icon" className="shrink-0">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConvertHeic;