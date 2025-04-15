# 🧠 SemantiCode

SemantiCode é uma ferramenta interativa que ajuda desenvolvedores a **praticar HTML semântico** e **entender como a estrutura semântica afeta diretamente a acessibilidade e SEO** de uma página web.

> _“Write Better HTML, One Tag at a Time 🚀”_

---

## 📌 Funcionalidades

- ✍️ **Editor de Código com Live Preview**  
  Escreva HTML e CSS em editores CodeMirror integrados e veja o resultado renderizado em tempo real.

- 🧱 **Gerador de Template HTML Básico**  
  Comece mais rápido com um botão que gera automaticamente uma estrutura mínima de HTML válida.

- 🚦 **Análise com Lighthouse API**  
  O projeto utiliza o Lighthouse para avaliar a página criada pelo usuário e retorna **pontuações de SEO e acessibilidade**.

- 🤖 **Chatbot com IA (GPT-4o via CablyAI)**  
  Um assistente de IA integrado que pode:
  - Explicar conceitos de HTML semântico
  - Gerar exemplos de código (semântico e não semântico)
  - Ajudar a identificar melhorias na sua página

- 📊 **Resultados Visuais**  
  As notas de SEO e acessibilidade são exibidas em gráficos circulares para fácil interpretação.

- 🧠 **Modal "How it works"**  
  Um diálogo explicativo que detalha o objetivo e funcionamento do projeto, acessível no topo da página.

- 📩 **Rodapé com Contato**  
  Informações sobre a criadora, email e site pessoal disponíveis no rodapé da página.

---

## 🖼️ Imagem do Projeto

![image](https://github.com/user-attachments/assets/85779cb4-aac3-4c29-9195-43971a15fd5f)

---

📹 Demonstração do Projeto
<video src="https://emilyjuly.github.io/semanticode/demo.webm" autoplay loop muted controls style="max-width: 100%; height: auto;"></video>

---

## 🚀 Como Funciona

1. Escreva HTML e CSS nos editores.
2. Veja o resultado renderizado em tempo real.
3. Clique em **Start analysis** para iniciar a análise com Lighthouse.
4. O app cria uma rota dinâmica que serve o HTML digitado como uma página temporária.
5. A API do Lighthouse analisa essa página e retorna:
   - **SEO score**
   - **Accessibility score**
6. Os resultados são exibidos na interface em gráficos coloridos.

---

## 📦 Tecnologias Utilizadas

- **Next.js** (com rotas API e dinâmica)
- **React + CodeMirror** para os editores de código
- **Lighthouse** (via API customizada com Node.js)
- **CablyAI** com **GPT-4o** para o chatbot
- **Chart.js / Recharts** (para os gráficos de score)

---

## 💡 Exemplo de Uso

Você pode pedir ao assistente de IA:
> "Me mostre um exemplo de uma página HTML sem uso semântico."

E então analisar o resultado para ver como a falta de semântica prejudica a acessibilidade e SEO.

---

## 📬 Contato

**Criado por:** Emily July  
📧 Email: [emilyjulygd@gmail.com](mailto:emilyjulygd@gmail.com)  
🌐 Site: [https://www.julydev.com.br/](https://www.julydev.com.br/)

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License** – fique à vontade para utilizar, contribuir ou adaptar.

---

## 🌟 Contribua

Se você tiver ideias para melhorar a experiência de aprendizado com HTML semântico, sinta-se à vontade para abrir uma issue ou enviar um PR!

