# 📚 Índice da Documentação do Template

Bem-vindo ao template de sites para agências! Esta documentação está organizada para facilitar o uso do template com diferentes clientes.

---

## 🎯 Para Começar (Leia Primeiro)

### [GUIA_CONFIGURACAO.md](GUIA_CONFIGURACAO.md)
**Guia passo a passo completo** de como configurar o template para um novo cliente.

📌 **Use quando**: For configurar o template pela primeira vez  
⏱️ **Tempo de leitura**: 10-15 minutos  
✅ **Inclui**: Mapeamento completo de todos os campos + troubleshooting

---

## 📋 Coleta de Informações

### [CHECKLIST_NOVO_CLIENTE.md](CHECKLIST_NOVO_CLIENTE.md)
**Checklist completo** com todas as informações necessárias do cliente.

📌 **Use quando**: For fazer reunião de briefing com novo cliente  
⏱️ **Tempo de preenchimento**: 30-60 minutos  
✅ **Inclui**: 
- Dados da empresa
- Contato e redes sociais
- Serviços oferecidos
- Conteúdo do site
- Requisitos técnicos
- Checklist final antes de entregar

---

### [LISTA_RAPIDA.md](LISTA_RAPIDA.md)
**Versão resumida** para captura rápida durante ligação/reunião rápida.

📌 **Use quando**: Precisar coletar dados rapidamente  
⏱️ **Tempo de preenchimento**: 10-15 minutos  
✅ **Inclui**: Apenas campos essenciais

---

## 📖 Exemplos Práticos

### [EXEMPLO_ADAPTACAO.md](EXEMPLO_ADAPTACAO.md)
**Exemplo real** de adaptação do template: Pisos → Carpintaria.

📌 **Use quando**: Quiser ver exemplo concreto de transformação  
⏱️ **Tempo de leitura**: 15 minutos  
✅ **Inclui**:
- Comparação antes/depois de cada campo
- Exemplo de substituição de serviços
- Mudança de cores e identidade
- Sugestões de otimização

---

## 📘 Documentação Técnica

### [TEMPLATE_README.md](TEMPLATE_README.md)
**Documentação técnica completa** em inglês (original).

📌 **Use quando**: Precisar de referência técnica detalhada  
⏱️ **Tempo de leitura**: 20 minutos  
✅ **Inclui**:
- Estrutura do projeto
- Stack tecnológico
- Customizações avançadas
- Deploy e hospedagem
- Troubleshooting técnico

---

## 🎯 Fluxo de Trabalho Recomendado

### Para Novo Cliente:

```
1. Reunião com Cliente
   └─ Use: LISTA_RAPIDA.md ou CHECKLIST_NOVO_CLIENTE.md
   
2. Configuração do Template
   └─ Use: GUIA_CONFIGURACAO.md
   
3. Dúvidas ou Referência
   └─ Use: EXEMPLO_ADAPTACAO.md
   
4. Problemas Técnicos
   └─ Use: TEMPLATE_README.md
```

---

## 📁 Estrutura dos Arquivos do Projeto

```
/template-site-base-1/
│
├── 📄 Documentação (você está aqui!)
│   ├── INDEX.md                      ← Este arquivo
│   ├── GUIA_CONFIGURACAO.md          ← Guia passo a passo
│   ├── CHECKLIST_NOVO_CLIENTE.md     ← Checklist completo
│   ├── LISTA_RAPIDA.md               ← Lista resumida
│   ├── EXEMPLO_ADAPTACAO.md          ← Exemplo prático
│   └── TEMPLATE_README.md            ← Docs técnicas
│
├── ⚙️ Configuração (EDITAR AQUI!)
│   └── lib/
│       └── siteConfig.ts             ← ⭐ ARQUIVO PRINCIPAL
│
├── 📱 Código do Site
│   ├── app/                          ← Páginas (raramente editar)
│   ├── components/                   ← Componentes (raramente editar)
│   └── public/                       ← ⭐ IMAGENS (sempre substituir)
│       └── images/
│           ├── hero/                 ← Imagem de fundo homepage
│           ├── services/             ← Fotos de serviços (7-10 fotos)
│           ├── portfolio/            ← Galeria projetos (7-10 fotos)
│           └── logo/                 ← Logo da empresa
│
└── 🔧 Configuração Técnica
    ├── tailwind.config.js            ← Cores (editar se necessário)
    ├── package.json                  ← Dependências
    └── tsconfig.json                 ← TypeScript config
```

---

## ✅ Checklist Rápido

Antes de começar a usar o template:

- [ ] Li o [GUIA_CONFIGURACAO.md](GUIA_CONFIGURACAO.md)
- [ ] Tenho o [CHECKLIST_NOVO_CLIENTE.md](CHECKLIST_NOVO_CLIENTE.md) pronto
- [ ] Vi o [EXEMPLO_ADAPTACAO.md](EXEMPLO_ADAPTACAO.md) para entender o processo
- [ ] Entendo onde editar (`/lib/siteConfig.ts` + imagens)
- [ ] Sei fazer build local (`npm run dev`)

---

## 🆘 Ajuda Rápida

### "Onde eu edito o nome da empresa?"
→ `/lib/siteConfig.ts` → campo `companyName`

### "Onde coloco as fotos do cliente?"
→ `/public/images/services/` e `/public/images/portfolio/`

### "Como testo o site antes de publicar?"
→ Terminal: `npm run dev` → Abrir `localhost:3000`

### "Como mudo as cores?"
→ `/tailwind.config.js` → seção `colors.brand`

### "Onde está o formulário de contato?"
→ `/components/ContactForm.tsx` → Editar URL do Google Forms

### "Como faço o deploy?"
→ Leia seção "Deployment" no [TEMPLATE_README.md](TEMPLATE_README.md)

---

## 💡 Dicas Pro

### Para Múltiplos Clientes Similares
Se você tem vários clientes do mesmo nicho (ex: 3 carpintarias):
1. Configure uma versão "modelo" completa
2. Duplique o projeto inteiro
3. Só mude: nome, contato, localização e fotos
4. Economize 60-70% do tempo!

### Organização de Projetos
Sugestão de nomenclatura:
```
/templates/
├── template-base-original/       ← Backup original limpo
├── template-carpintaria-modelo/  ← Modelo pré-configurado
├── cliente-carpintaria-silva/    ← Projeto cliente 1
├── cliente-marcenaria-souza/     ← Projeto cliente 2
└── cliente-pintura-costa/        ← Projeto cliente 3
```

### Versionamento
Considere usar Git para cada projeto:
```bash
cd projeto-cliente
git init
git add .
git commit -m "Versão inicial - Cliente XYZ"
```

---

## 📞 Suporte

**Dúvidas sobre o template?**
- Revise a documentação acima
- Veja o [EXEMPLO_ADAPTACAO.md](EXEMPLO_ADAPTACAO.md)
- Consulte [TEMPLATE_README.md](TEMPLATE_README.md) para referência técnica

**Problemas técnicos?**
- Seção "Troubleshooting" no [GUIA_CONFIGURACAO.md](GUIA_CONFIGURACAO.md)
- Seção "Common Issues" no [TEMPLATE_README.md](TEMPLATE_README.md)

---

## 📊 Estatísticas

**Tempo médio por cliente**: 2-3 horas  
**Arquivos a editar**: 1-3 (siteConfig.ts + imagens + cores)  
**Complexidade**: ⭐⭐☆☆☆ (Intermediário)  
**Resultado**: Site profissional 100% funcional

---

## 🎓 Recursos Adicionais

### Ferramentas Úteis
- **Otimização de imagens**: [TinyPNG](https://tinypng.com)
- **Paleta de cores**: [Coolors.co](https://coolors.co)
- **Google Forms**: [forms.google.com](https://forms.google.com)
- **Fontes gratuitas**: [Google Fonts](https://fonts.google.com)

### Aprendizado
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **TypeScript**: [typescriptlang.org/docs](https://typescriptlang.org/docs)

---

**Versão da Documentação**: 1.0.0  
**Última Atualização**: Fevereiro 2026  
**Template Version**: 1.0.0

---

✨ **Pronto para começar?** Vá para [GUIA_CONFIGURACAO.md](GUIA_CONFIGURACAO.md)!
