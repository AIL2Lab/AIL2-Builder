
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Progress } from './progress';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ImageUploadProps {
  value?: string; // 改为单个字符串
  disabled?: boolean;
  onChange: (url?: string) => void; // 回调也改为单个字符串或 undefined
  onUpload: (file: File) => Promise<string>; // 上传函数也改为处理单个文件
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  disabled,
  onChange,
  onUpload,
}) => {
  const t = useTranslations('ImageUpload');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled || acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setIsUploading(true);
      setUploadProgress(0);

      try {
        // 模拟上传进度
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => (prev < 90 ? prev + 10 : prev));
        }, 300);

        const url = await onUpload(file);

        clearInterval(progressInterval);
        setUploadProgress(100);
        
        onChange(url); // 只传递单个 URL

      } catch (error) {
        console.error("Upload failed:", error);
        // 这里可以添加错误提示，例如使用 toast
      } finally {
        setIsUploading(false);
        setTimeout(() => setUploadProgress(0), 500); // 重置进度条
      }
    },
    [onChange, onUpload, disabled]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    multiple: false, // 关键修改：禁用多选
    disabled,
  });

  const handleRemove = () => {
    onChange(undefined); // 清空图片
  };

  return (
    <div className="space-y-4">
      {/* 如果已有图片，则显示预览 */}
      {value ? (
        <Card className="relative overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-square w-full max-w-sm mx-auto">
              <img
                src={value}
                alt={t('alt')}
                className="w-full h-full object-cover"
              />
              {!disabled && (
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={handleRemove}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        /* 如果没有图片，则显示上传区域 */
        <Card className="border-dashed">
          <CardContent className="p-6">
            <div
              {...getRootProps()}
              className={`
                cursor-pointer text-center p-10 border-2 rounded-md transition-colors flex flex-col items-center justify-center space-y-2
                ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
                ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:border-primary hover:bg-primary/5'}
              `}
            >
              <input {...getInputProps()} />
              {isUploading ? (
                <div className="w-full space-y-2">
                  <p className="text-sm text-muted-foreground">{t('uploading')}</p>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              ) : (
                <>
                  {isDragActive ? (
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  ) : (
                    <Upload className="h-10 w-10 text-muted-foreground" />
                  )}
                  <p className="text-sm text-muted-foreground">
                    {isDragActive
                      ? t('drop_here')
                      : t('drag_drop')}
                  </p>
                  <Button type="button" variant="secondary" size="sm" disabled={disabled}>
                    {t('select_file')}
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
