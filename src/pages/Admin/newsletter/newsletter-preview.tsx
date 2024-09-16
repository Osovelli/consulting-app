import { Button } from '../../../components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface NewsletterPreviewProps {
  subject: string;
  content: string;
  onBack: () => void;
  onSend: () => void;
}

export function NewsletterPreview({ subject, content, onBack, onSend }: NewsletterPreviewProps) {
  return (
    <div className="max-w-5xl mx-auto p-4 bg-white min-h-dvh font-hubot">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2 cursor-pointer" onClick={onBack} />
          <h1 className="text-lg font-medium">Preview newsletter</h1>
        </div>
        <Button onClick={onSend}>Send</Button>
      </div>
      <div className="border rounded-lg p-6 mb-4">
        {/*<h2 className="text-xl font-bold mb-4">{subject}</h2>*/}
        <div
          className="prose max-w-none text-center  pt-12"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <div className="text-center text-sm text-gray-500">
        <p>If you didn't sign up or would like to not receive emails you can <a href="#" className="text-blue-500">Unsubscribe</a> or <a href="#" className="text-blue-500">Manage subscriptions</a></p>
      </div>
      <div className="flex justify-center space-x-4 mt-4 text-xs text-gray-500">
        <a href="#">T&C</a>
        <a href="#">Cookies</a>
        <a href="#">Privacy</a>
        <a href="#">Support</a>
      </div>
      <div className="text-center text-xs text-gray-500 mt-2">
        © D&E Business Consulting 2024
        <br />
        [Address]
      </div>
    </div>
  );
}