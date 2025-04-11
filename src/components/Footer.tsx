import { Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="flex justify-between bottom-0 w-full p-4 border-t text-sm">
      <div className="flex flex-col">
        <Code className="w-10 h-10 text-pink-500" />
        <p className="font-bold">
          <span className="text-primary">Semanti</span>
          <span className="text-secondary">Code</span>
          <span className="blinking-cursor">|</span>
        </p>
        <i className="mt-5">Write Better HTML, One Tag at a Time.  🚀</i>
      </div>
      <div>
        <strong>Contacts</strong>
        <div className="flex flex-col mt-4">
          <span className="text-gray-500">Email</span>{' '}
          <a className="underline" href="mailto:emilyjulygd@gmail.com">
            emilyjulygd@gmail.com
          </a>
        </div>
        <div className="flex flex-col mt-4">
          <span className="text-gray-500">Site</span>
          <a className="underline" href="https://www.julydev.com.br/" target='_blank'>
            https://www.julydev.com.br/
          </a>
        </div>
      </div>
      &copy; 2025 SemantiCode. All rights reserved.
    </footer>
  );
};

export default Footer;
