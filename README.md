# Avalon Tech | Conecta+ — Site institucional

Site institucional da Conecta+, tecnologia do grupo Avalon, para apresentação ao cliente antes da hospedagem definitiva.

## Como publicar no GitHub Pages
1. Crie um repositório chamado **avalon-tech** na conta `dudufrg`.
2. Envie todos os arquivos desta pasta para a raiz do repositório.
3. Em **Settings > Pages**, selecione a branch `main` e a pasta `/ (root)`.
4. O site fica disponível em `https://dudufrg.github.io/avalon-tech/`.
5. Quando o domínio real estiver disponível, edite o arquivo `CNAME` (já incluso, apontando para `tech.avalontk.com.br`) e configure o DNS conforme a documentação do GitHub Pages.

## Checklist técnico aplicado
- Código completo em HTML, CSS e JS, sem frameworks
- Título e meta description únicos por página
- Alt text e aria-label em elementos visuais e ícones
- Schema.org LocalBusiness + FAQPage
- robots.txt com liberação explícita para agentes de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- llms.txt com mapa do site para leitura por IA (AEO/GEO)
- Página 404 personalizada
- Política de Privacidade (LGPD)
- Open Graph + Twitter Cards + imagem de compartilhamento própria
- Favicon completo (ico, png, apple-touch-icon)
- Sem dependências pesadas, fontes carregadas via preconnect
- Reduced motion respeitado, foco visível em elementos interativos

## Pendências para o lançamento
- Adicionar Google Analytics (GA4) ao final do projeto, conforme combinado
- Substituir o domínio placeholder `tech.avalontk.com.br` pelo domínio real quando definido
- Formulário de contato hoje abre o e-mail do visitante (sem backend); se quiser recebimento direto, integrar um serviço como Formspree
