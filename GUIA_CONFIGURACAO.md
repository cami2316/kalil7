# 🎯 Guia Rápido: Como Configurar para Novo Cliente

Este guia mostra passo a passo como aplicar as informações do checklist ao template.

---

## 📍 PASSO 1: Abra o arquivo de configuração

Arquivo: `/lib/siteConfig.ts`

Este é o **ÚNICO arquivo** que você precisa editar para 90% das customizações.

---

## 🔧 PASSO 2: Mapeamento de Informações

### INFORMAÇÕES DA EMPRESA
```typescript
companyName: 'Nome da Empresa do Cliente',
niche: 'Nicho de Atuação (ex: Carpintaria & Marcenaria)',
tagline: 'Slogan/Tagline da Empresa',
```

---

### CONTATO
```typescript
// IMPORTANTE: Remover espaços do telefone para links funcionarem
phone: '11 98765 4321',              // Com espaços (para exibição)
phoneFormatted: '(11) 98765-4321',   // Formatado (para exibição)
whatsapp: '11987654321',             // SEM espaços (para link WhatsApp)
email: 'contato@empresa.com',

businessHours: 'Seg–Sex 8h–18h • Sáb 9h–13h',

instagram: {
  handle: '@empresainstagram',
  url: 'https://www.instagram.com/empresainstagram/'
},
```

---

### LOCALIZAÇÃO
```typescript
city: 'São Paulo',
state: 'São Paulo',
region: 'Grande São Paulo',

serviceAreas: [
  'São Paulo',
  'Guarulhos',
  'Osasco',
  'Santo André',
  'São Caetano do Sul'
],
```

**Dica**: Liste 3-8 cidades/bairros principais.

---

### EXPERIÊNCIA E NÚMEROS
```typescript
yearsExperience: '15+',           // Anos de experiência
projectsCompleted: '500+',        // Projetos concluídos

stats: [
  { value: '15+', label: 'Anos de Experiência' },
  { value: '500+', label: 'Projetos Concluídos' },
  { value: 'Licenciado', label: '& Segurado' },
  { value: '5 Estrelas', label: 'Avaliação Média' }
],
```

---

### SERVIÇOS (3 principais)
```typescript
services: [
  {
    title: 'Nome do Serviço 1',
    description: 'Descrição curta e atrativa do serviço oferecido.',
    image: '/images/services/servico1.jpg',
    alt: 'Texto alternativo descritivo',
  },
  {
    title: 'Nome do Serviço 2',
    description: 'Descrição curta e atrativa do segundo serviço.',
    image: '/images/services/servico2.jpg',
    alt: 'Texto alternativo descritivo',
  },
  {
    title: 'Nome do Serviço 3',
    description: 'Descrição curta e atrativa do terceiro serviço.',
    image: '/images/services/servico3.jpg',
    alt: 'Texto alternativo descritivo',
  }
],
```

**IMPORTANTE**: Você precisa ter as imagens correspondentes na pasta `/public/images/services/`

---

### VALORES DA EMPRESA
```typescript
values: [
  {
    title: 'Valor/Diferencial 1',
    description: 'Explicação do primeiro valor ou diferencial.'
  },
  {
    title: 'Valor/Diferencial 2',
    description: 'Explicação do segundo valor ou diferencial.'
  },
  {
    title: 'Valor/Diferencial 3',
    description: 'Explicação do terceiro valor ou diferencial.'
  }
],
```

---

### HERO SECTION (Homepage)
```typescript
heroTitle: 'Título Principal Impactante',
heroSubtitle: 'Subtítulo descritivo que explica os serviços e região de atuação.',
```

**Dica**: 
- `heroTitle`: Curto e direto (5-8 palavras)
- `heroSubtitle`: Mais descritivo (15-25 palavras)

---

### SEO
```typescript
siteUrl: 'https://www.sitedeocliente.com.br',
defaultImage: '/images/hero/place_1.jpg',  // Imagem para redes sociais
```

**IMPORTANTE**: Atualizar `siteUrl` antes do deploy para produção!

---

## 🖼️ PASSO 3: Substituir Imagens

### Estrutura de pastas:
```
/public/images/
├── hero/           → Imagem de fundo da homepage
├── services/       → Fotos dos serviços (7-10 fotos)
├── portfolio/      → Galeria de projetos (7-10 fotos)
└── logo/           → Logo da empresa (formato SVG de preferência)
```

### Nomes de arquivo necessários:

#### Hero (1 foto):
- `place_1.jpg` - Imagem principal de fundo

#### Services (7 fotos recomendadas):
- `floor1.jpg` ou renomear para o serviço (ex: `carpintaria1.jpg`)
- `floor 2.jpg`
- `floor 03.jpg`
- `bath.jpg`
- `bath2.jpg`
- `bath03.jpg`
- `bath04.jpg`

#### Portfolio (7 fotos recomendadas):
- `floor1.jpg`
- `bath.jpg`
- `bath03.jpg`
- `bath04.jpg`
- `bath2.jpg`
- `floor 2.jpg`
- `floor 03.jpg`

#### Logo:
- `logo white.svg` - Logo branca para header/footer

**Dica**: Mantenha os mesmos nomes de arquivo OU atualize as referências no `siteConfig.ts`

---

## 🎨 PASSO 4: Cores (Opcional)

Se o cliente tiver cores específicas da marca, edite: `/tailwind.config.js`

```javascript
colors: {
  brand: {
    primary: '#COR_PRIMARIA',      // Cor principal dos botões
    accent: '#COR_SECUNDARIA',      // Cor de destaque/hover
    charcoal: '#2b2d42',            // Preto/cinza escuro
    white: '#ffffff',               // Branco
  },
}
```

**Dica**: Use ferramentas como [Coolors.co](https://coolors.co) para extrair cores de um logo.

---

## 📝 PASSO 5: Formulário de Contato

Edite: `/components/ContactForm.tsx`

```tsx
<iframe
  src="URL_DO_GOOGLE_FORMS_EMBED_DO_CLIENTE"
  width="100%"
  height="2200"
  // ...
```

### Como obter o URL:
1. Criar Google Form
2. Clicar em "Enviar"
3. Selecionar ícone `< >`
4. Copiar URL do `src="..."`

---

## ✅ PASSO 6: Checklist Antes de Entregar

### Testar localmente:
```bash
npm run dev
```

Verificar:
- [ ] Homepage abre sem erros
- [ ] Todas as páginas funcionam (Home, Serviços, Portfólio, Sobre, Contato)
- [ ] Menu de navegação funciona
- [ ] Imagens carregam corretamente
- [ ] Links de telefone/email funcionam
- [ ] Links de redes sociais abrem corretamente
- [ ] Formulário de contato funciona
- [ ] Site responsivo no mobile (testar no celular ou DevTools)

### Build para produção:
```bash
npm run build
```

Se houver erros, ler mensagem e corrigir.

---

## 🚀 PASSO 7: Deploy

### Opção 1: Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Opção 2: Netlify
1. Build: `npm run build`
2. Upload pasta `.next` no Netlify

### Opção 3: Hostinger/cPanel
1. Build: `npm run build`
2. Seguir documentação de deploy Next.js da hospedagem

---

## 🆘 Problemas Comuns

### "Build Failed" - Erros de TypeScript
**Causa**: Informações faltando no `siteConfig.ts`  
**Solução**: Verificar que todos os campos obrigatórios estão preenchidos

### Imagens não aparecem
**Causa**: Nome de arquivo errado ou caminho incorreto  
**Solução**: Verificar nomes exatos em `/public/images/` e `siteConfig.ts`

### Telefone/WhatsApp não funciona
**Causa**: Espaços ou caracteres especiais no número  
**Solução**: Campo `whatsapp` deve ter APENAS números (sem espaços, traços ou parênteses)

### Site mostra informações antigas
**Causa**: Cache do navegador  
**Solução**: Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac) para hard refresh

---

## 📊 Tempo Estimado de Configuração

- **Coleta de informações**: 30-60 minutos
- **Configuração do siteConfig.ts**: 15-30 minutos
- **Substituição de imagens**: 30-45 minutos
- **Ajustes de cores (se necessário)**: 15 minutos
- **Testes**: 30 minutos
- **Deploy**: 15-30 minutos

**Total**: 2-3 horas por cliente

---

## 📞 Informações Importantes para o Cliente Final

Após entregar o site, informar ao cliente:

✅ **Como editar**: Qualquer alteração de texto/contato requer editar código (não é WordPress)  
✅ **Hospedagem**: Renovação anual necessária  
✅ **Domínio**: Renovação anual necessária  
✅ **Formulário**: Respostas chegam no email do Google Forms  
✅ **Manutenção**: Recomendado atualizar imagens/portfólio a cada 6 meses  

---

**Dúvidas?** Consulte o arquivo `TEMPLATE_README.md` para documentação completa em inglês.
