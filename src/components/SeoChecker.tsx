'use client'

import { useEffect } from "react";

const SeoChecker = ({ code }: { code: string }) => {
    const [seoScore, setSeoScore] = useState<number>(0);

    useEffect(() => {
        if (code) {
            const score = Math.random() * 100;
            setSeoScore(score);
        }
    }, [code]);

    return (
      <div className="mt-4">
        <h3 className="text-xl">SEO Score: {seoScore.toFixed(2)}%</h3>
        {/* Adicionar mais métricas de SEO e acessibilidade aqui */}
      </div>
    );
}

export default SeoChecker;