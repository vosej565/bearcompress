import React, { useState, useCallback, useEffect, useRef } from "react";
import { Upload, Download, X, Loader2, Archive } from "lucide-react";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { convertImage, convertHeicToPng } from "@/lib/imageUtils";

const ConvertImages = ({ uiText = {}, initialFiles = null }) => {
  const {
    dropLabel = "Drop Images Here",
    orLabel = "or",
    buttonLabel = "Select Images",
    supportLabel = "Supports JPG, PNG, WebP, HEIC",
  } = uiText;

  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processUploadedFiles = async (uploadedFiles) => {
    setIsProcessing(true);
    const newFileEntries = [];

    for (const file of uploadedFiles) {
      const fileName = file.name.toLowerCase();
      const fileType = file.type;

      if (
        fileType.startsWith("image/") ||
        fileName.endsWith(".heic") ||
        fileName.endsWith(".heif")
      ) {
        let imageFile = file;
        let originalName = file.name;

        if (fileName.endsWith(".heic") || fileName.endsWith(".heif")) {
          try {
            toast({
              title: "Preparing HEIC...",
              description: `Processing ${file.name} for conversion.`,
            });
            imageFile = await convertHeicToPng(file);
            originalName = imageFile.name;
          } catch {
            toast({
              title: "HEIC Conversion Failed",
              description: `Could not process ${file.name}.`,
              variant: "destructive",
            });
            continue;
          }
        }

        newFileEntries.push({
          id: Math.random().toString(36).substr(2, 9),
          original: imageFile,
          preview: URL.createObjectURL(imageFile),
          name: originalName,
          targetFormat: "image/png",
          converted: null,
          convertedPreview: null,
        });
      } else {
        toast({
          title: "Unsupported File",
          description: `${file.name} is not supported.`,
          variant: "destructive",
        });
      }
    }

    setFiles((prev) => [...newFileEntries, ...prev]);
    setIsProcessing(false);
  };

  useEffect(() => {
    if (initialFiles && initialFiles.length) {
      processUploadedFiles(initialFiles);
    }
  }, [initialFiles]);

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    await processUploadedFiles(e.dataTransfer.files);
  };

  const handleFileInput = async (e) => {
    await processUploadedFiles(e.target.files);
    e.target.value = "";
  };

  const handleFormatChange = (id, format) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? { ...file, targetFormat: format, converted: null, convertedPreview: null }
          : file
      )
    );
  };

  const handleConvert = async (id) => {
    const target = files.find((f) => f.id === id);
    if (!target) return;

    try {
      const converted = await convertImage(target.original, target.targetFormat);

      setFiles((prev) =>
        prev.map((file) =>
          file.id === id
            ? {
                ...file,
                converted,
                convertedPreview: URL.createObjectURL(converted),
              }
            : file
        )
      );

      toast({ title: "Conversion Success!", description: "File converted." });
    } catch {
      toast({
        title: "Conversion Failed",
        description: "Could not convert file.",
        variant: "destructive",
      });
    }
  };

  /** -------------------------------------------
   *   ZIP 다운로드 기능 (파일 다운로드 방식)
   *   JSZip + <a download> 사용 (file-saver 없음)
   * ------------------------------------------ */
  const handleDownloadAllZip = async () => {
    const zip = new JSZip();
    const folder = zip.folder("converted_images");

    let count = 0;

    for (const file of files) {
      if (!file.converted) continue;

      const blob = file.converted;
      const extension = file.targetFormat.split("/")[1];
      const safeExt = extension === "jpeg" ? "jpg" : extension;

      const filename = file.name.replace(/\.[^/.]+$/, "") + "." + safeExt;

      folder.file(filename, blob);
      count++;
    }

    if (count === 0) {
      toast({
        title: "Nothing to download",
        description: "No converted files found.",
      });
      return;
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "converted_images.zip";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleDownload = (file) => {
    if (!file.converted) return;

    const url = URL.createObjectURL(file.converted);
    const a = document.createElement("a");

    let ext = file.targetFormat.split("/")[1];
    if (ext === "jpeg") ext = "jpg";

    const base = file.name.replace(/\.[^/.]+$/, "");

    a.href = url;
    a.download = `${base}.${ext}`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleRemove = (id) => {
    setFiles((prev) => {
      const target = prev.find((f) => f.id === id);

      if (target?.preview) URL.revokeObjectURL(target.preview);
      if (target?.convertedPreview) URL.revokeObjectURL(target.convertedPreview);

      return prev.filter((f) => f.id !== id);
    });
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full h-96 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl shadow-sm transition ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
        }`}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-14 h-14 mb-4 text-blue-500 animate-spin" />
            <h3 className="text-2xl font-semibold text-gray-700">Processing Files...</h3>
          </>
        ) : (
          <>
            <Upload className="w-14 h-14 mb-4 text-gray-400" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">{dropLabel}</h3>
            <p className="text-gray-500 mb-6">{orLabel}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => fileInputRef.current.click()}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl h-16 px-10"
              >
                {buttonLabel}
              </Button>

            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
              onChange={handleFileInput}
              className="hidden"
            />

            <p className="absolute bottom-6 text-sm text-gray-500">{supportLabel}</p>
          </>
        )}
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
  <h3 className="text-lg font-semibold text-gray-900">
    Files to Convert ({files.length})
  </h3>

  <Button
    onClick={handleDownloadAllZip}
    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
  >
    <Archive className="w-4 h-4" />
    Download ZIP
  </Button>
</div>


          <div className="grid gap-4">
            {files.map((file) => (
              <div key={file.id} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-2">Original</p>
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-24 h-24 object-cover rounded border"
                      />
                    </div>

                    {file.convertedPreview && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-2">Converted</p>
                        <img
                          src={file.convertedPreview}
                          className="w-24 h-24 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-3">{file.name}</p>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Convert to:
                      </label>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleFormatChange(file.id, "image/jpeg")}
                          variant={file.targetFormat === "image/jpeg" ? "default" : "outline"}
                          size="sm"
                        >
                          JPG
                        </Button>
                        <Button
                          onClick={() => handleFormatChange(file.id, "image/png")}
                          variant={file.targetFormat === "image/png" ? "default" : "outline"}
                          size="sm"
                        >
                          PNG
                        </Button>
                        <Button
                          onClick={() => handleFormatChange(file.id, "image/webp")}
                          variant={file.targetFormat === "image/webp" ? "default" : "outline"}
                          size="sm"
                        >
                          WebP
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button
                        onClick={() => handleConvert(file.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        size="sm"
                      >
                        Convert
                      </Button>

                      {file.converted && (
                        <Button
                          onClick={() => handleDownload(file)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          size="sm"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleRemove(file.id)}
                    variant="outline"
                    size="icon"
                    className="self-start"
                  >
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

export default ConvertImages;