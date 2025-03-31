'use client'

import { useEffect } from "react";

const AiSuggestions = ({ code }: { code: string }) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        if (code) {
            const suggestionList = ["Consider using semantic HTML tags.", "Ensure proper alt text for images."];
            setSuggestions(suggestionList);
        }
    }, [code]);

    return (
      <div className="mt-4">
        <h3 className="text-xl">AI Suggestions</h3>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} className="text-sm text-gray-700">
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    );
};

export default AiSuggestions;