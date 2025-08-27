# Solução para Problema de Imagens em Base64

## Problema Identificado

As imagens do projeto estavam sendo automaticamente convertidas para base64 pelo Vite, causando:
- Imagens não carregando corretamente
- Aumento no tamanho do bundle JavaScript
- Problemas de performance

## Solução Implementada

### 1. Configuração do Vite
- **`assetsInlineLimit: 0`**: Desabilita a conversão automática de assets para base64
- Configurado no `vite.config.ts`

### 2. Reorganização dos Assets
- **Movidas as imagens** de `src/assets/` para `public/assets/`
- **URLs absolutas**: As imagens agora são servidas como `/assets/nome-da-imagem.ext`
- **Sem processamento**: As imagens não passam pelo bundler do Vite

### 3. Atualização dos Componentes
- **Importações estáticas removidas**: Não mais `import imagem from '../assets/imagem.jpg'`
- **URLs diretas**: Uso de `src="/assets/imagem.jpg"` ou através do utilitário `images`

### 4. Arquivo de Utilitários
- **`src/utils/images.ts`**: Centraliza as URLs das imagens
- **Função helper**: `getImageUrl()` para obter URLs das imagens

## Estrutura de Arquivos

```
public/
  assets/
    logotipo-website-sabores-da-romeira-1.svg
    IMG_0894.JPG
    IMG_8070.JPG

src/
  utils/
    images.ts          # URLs das imagens
  components/
    BirthdayInvite.tsx # Componente atualizado
```

## Vantagens da Solução

✅ **Imagens carregam corretamente**  
✅ **Sem conversão para base64**  
✅ **Melhor performance**  
✅ **Bundle JavaScript menor**  
✅ **Fácil manutenção**  
✅ **Padrão recomendado pelo Vite**  

## Como Usar

### Opção 1: URL Direta
```tsx
<img src="/assets/imagem.jpg" alt="Descrição" />
```

### Opção 2: Utilitário (Recomendado)
```tsx
import { images } from '../utils/images';

<img src={images.imgMotorcycle} alt="Motorcycle" />
```

### Opção 3: Função Helper
```tsx
import { getImageUrl } from '../utils/images';

<img src={getImageUrl('imgMotorcycle')} alt="Motorcycle" />
```

## Configurações Importantes

### vite.config.ts
```ts
build: {
  assetsInlineLimit: 0, // Desabilita conversão para base64
}
```

### tsconfig.json
- Configurado para reconhecer imports de imagens
- Paths configurados para `@/*` apontar para `src/*`

## Comandos para Aplicar

```bash
# 1. Criar pasta public/assets
mkdir -p public/assets

# 2. Mover imagens
cp src/assets/* public/assets/

# 3. Rebuild do projeto
npm run build

# 4. Testar desenvolvimento
npm run dev
```

## Notas Importantes

- **Pasta `public/`**: Assets estáticos servidos diretamente pelo servidor
- **Pasta `src/assets/`**: Assets que passam pelo bundler (não recomendado para imagens grandes)
- **URLs absolutas**: Sempre começam com `/` (ex: `/assets/imagem.jpg`)
- **Cache**: Imagens na pasta `public/` podem ser cacheadas pelo navegador

## Troubleshooting

### Imagem não carrega
1. Verificar se está na pasta `public/assets/`
2. Verificar se a URL está correta (deve começar com `/`)
3. Verificar se o servidor está rodando

### Erro de build
1. Verificar se `assetsInlineLimit: 0` está configurado
2. Verificar se as imagens foram movidas para `public/`
3. Verificar se as URLs foram atualizadas nos componentes
