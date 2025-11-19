import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Upload,
  Download,
  X,
  ChevronDown,
  Loader2,
  RefreshCw,
  Archive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { compressImage, convertHeicToTarget } from "@/lib/imageUtils";
import { formatFileSize } from "@/lib/formatUtils";
import JSZip from "jszip";

const qualityOptions = {
  "Low Compression": 0.85,
  Balanced: 0.65,
  "High Compression": 0.4,
};

const CompressImages = ({ uiText = {}, initialFiles = null }) => {
  const {
    dropLabel = "Drop Images Here",
    orLabel = "or",
    buttonLabel = "Select Images",
    supportLabel = "Supports JPG, PNG, WebP & HEIC",
  } = uiText;

  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [quality, setQuality] = useState(0.65);
  const [qualityLabel, setQualityLabel] = useState("Balanced");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  /* ----------------- Drag ----------------- */
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  /* ----------------- File Handling ----------------- */
  const processFiles = async (fileList) => {
    setIsProcessing(true);

    const imageFiles = [];
    const heicFiles = [];

    Array.from(fileList).forEach((file) => {
      const type = file.type.toLowerCase();
      const name = file.name.toLowerCase();

      if (["image/jpeg", "image/png", "image/webp"].includes(type)) {
        imageFiles.push(file);
      } else if (
        type.includes("heic") ||
        type.includes("heif") ||
        name.endsWith(".heic") ||
        name.endsWith(".heif")
      ) {
        heicFiles.push(file);
      } else {
        toast({
          title: "Unsupported File",
          description: `${file.name} is not supported.`,
          variant: "destructive",
        });
      }
    });

    /* HEIC → JPG */
    if (heicFiles.length > 0) {
      toast({
        title: "Converting HEIC...",
        description: "HEIC images will be converted to JPG.",
      });

      const converted = await Promise.all(
        heicFiles.map((file) =>
          convertHeicToTarget(file, "image/jpeg").catch(() => null)
        )
      );

      imageFiles.push(...converted.filter(Boolean));
    }

    /* Compress */
    const processed = await Promise.all(
      imageFiles.map(async (file) => {
        try {
          const compressed = await compressImage(file, quality);

          const originalSize = file.size;
          const compressedSize = compressed.size;
          const savings = (
            ((originalSize - compressedSize) / originalSize) *
            100
          ).toFixed(1);

          return {
            id: Math.random().toString(36).substr(2, 9),
            original: file,
            compressed,
            originalSize,
            compressedSize,
            savings,
            preview: URL.createObjectURL(file),
            compressedPreview: URL.createObjectURL(compressed),
          };
        } catch (e) {
          toast({
            title: "Compression Error",
            description: `Failed to compress ${file.name}`,
            variant: "destructive",
          });
          return null;
        }
      })
    );

    const valid = processed.filter(Boolean);

    if (valid.length > 0) {
      setFiles((prev) => [...valid, ...prev]);
      toast({
        title: "Success!",
        description: `${valid.length} image(s) compressed.`,
      });
    }

    setIsProcessing(false);
  };

  /* Auto-process initial files */
  useEffect(() => {
    if (initialFiles && initialFiles.length) {
      processFiles(initialFiles);
    }
    // eslint-disable-next-line
  }, [initialFiles]);

  /* ----------------- ZIP Download (no file-saver) ----------------- */
  const downloadZip = async () => {
    if (files.length === 0) return;

    const zip = new JSZip();

    files.forEach((f) => zip.file(f.compressed.name, f.compressed));

    const blob = await zip.generateAsync({ type: "blob" });

    // ZIP 다운로드 (file-saver 없이)
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed_images.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ----------------- Single Download ----------------- */
  const downloadSingle = (file) => {
    const url = URL.createObjectURL(file.compressed);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.compressed.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ----------------- Remove Item ----------------- */
  const removeItem = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  /* ----------------- Recompress ----------------- */
  const recompressSingle = async (id) => {
    const target = files.find((f) => f.id === id);
    if (!target) return;

    toast({
      title: "Recompressing...",
      description: `${target.original.name}`,
    });

    try {
      const newCompressed = await compressImage(target.original, quality);

      const updated = {
        ...target,
        compressed: newCompressed,
        compressedSize: newCompressed.size,
        compressedPreview: URL.createObjectURL(newCompressed),
        savings: (
          ((target.originalSize - newCompressed.size) /
            target.originalSize) *
          100
        ).toFixed(1),
      };

      setFiles((prev) => prev.map((f) => (f.id === id ? updated : f)));

      toast({
        title: "Done!",
        description: "File recompressed.",
      });
    } catch (e) {
      toast({
        title: "Failed",
        description: "Could not recompress.",
        variant: "destructive",
      });
    }
  };

  /* ----------------- UI ----------------- */
  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          processFiles(e.dataTransfer.files);
        }}
        className={`relative w-full h-96 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl transition ${isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50"
          }`}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-14 h-14 mb-4 text-blue-500 animate-spin" />
            <h3 className="text-2xl font-semibold text-gray-700">
              Processing...
            </h3>
          </>
        ) : (
          <>
            <Upload className="w-14 h-14 mb-4 text-gray-400" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {dropLabel}
            </h3>
            <p className="text-gray-500 mb-6">{orLabel}</p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                onClick={() => fileInputRef.current.click()}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl h-16 px-10"
              >
                {buttonLabel}
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                onChange={(e) => {
                  processFiles(e.target.files);
                  e.target.value = "";
                }}
                className="hidden"
              />

              {/* Quality */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-xl text-md">
                    {qualityLabel}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-64 z-50 bg-white shadow-xl">
                  {Object.entries(qualityOptions).map(([label, value]) => (
                    <DropdownMenuItem
                      key={label}
                      onSelect={() => {
                        setQualityLabel(label);
                        setQuality(value);
                      }}
                    >
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="absolute bottom-6 text-sm text-gray-500">
              {supportLabel}
            </p>
          </>
        )}
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Compressed Files ({files.length})
            </h3>

            <Button
              onClick={downloadZip}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Archive className="w-4 h-4 mr-2" />
              Download ZIP
            </Button>
          </div>

          <div className="grid gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-white border rounded-lg p-4 shadow-sm"
              >
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex gap-4">
                    {/* Original */}
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-2">Original</p>
                      <img
                        src={file.preview}
                        className="w-24 h-24 object-cover rounded border"
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        {formatFileSize(file.originalSize)}
                      </p>
                    </div>

                    {/* Compressed */}
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-2">Compressed</p>
                      <img
                        src={file.compressedPreview}
                        className="w-24 h-24 object-cover rounded border"
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        {formatFileSize(file.compressedSize)}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <p className="font-medium text-gray-900 truncate">
                      {file.original.name}
                    </p>

                    <p className="text-sm text-green-600 font-semibold mt-2">
                      Saved {file.savings}%
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => downloadSingle(file)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>

                    <Button
                      onClick={() => recompressSingle(file.id)}
                      variant="outline"
                      size="sm"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Recompress
                    </Button>

                    <Button
                      onClick={() => removeItem(file.id)}
                      variant="outline"
                      size="icon"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompressImages;
