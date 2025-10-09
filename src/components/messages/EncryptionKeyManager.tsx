import { useState, useRef } from 'react';
import { useEncryption } from '@/hooks/useEncryption';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Upload, Key, Shield } from 'lucide-react';
import { toast } from 'sonner';

export const EncryptionKeyManager = () => {
  const { downloadKeysBackup, importKeys, getPublicKeyBytes } = useEncryption();
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    try {
      const text = await file.text();
      const success = importKeys(text);
      
      if (success) {
        // Reload page to reinitialize with new keys
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      toast.error('Failed to read backup file');
    } finally {
      setImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const publicKey = getPublicKeyBytes();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Encryption Key Management
        </CardTitle>
        <CardDescription>
          Backup and restore your end-to-end encryption keys. Keep your backup file safe!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Public Key</label>
          <div className="p-2 bg-muted rounded-md text-xs font-mono break-all">
            {publicKey || 'Not available'}
          </div>
          <p className="text-xs text-muted-foreground">
            This key is public and registered on-chain for encrypted messaging.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={downloadKeysBackup}
            variant="outline"
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Backup Keys
          </Button>

          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="flex-1"
            disabled={importing}
          >
            <Upload className="h-4 w-4 mr-2" />
            {importing ? 'Importing...' : 'Restore Keys'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>

        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-sm text-destructive font-medium flex items-center gap-2">
            <Key className="h-4 w-4" />
            Security Warning
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Your private key is stored locally and never sent to servers. Keep your backup file secure and never share it.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
