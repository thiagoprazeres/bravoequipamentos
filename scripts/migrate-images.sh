#!/usr/bin/env bash
# migrate-images.sh
# Baixa todas as imagens do servidor antigo, converte para WebP e organiza em /public/images/

SRC="https://bravoequipamentos.com/images"
DST="$(cd "$(dirname "$0")/.." && pwd)/public/images"

mkdir -p "$DST/layouts"
mkdir -p "$DST/LOGOMARCAS/construcao" "$DST/LOGOMARCAS/industria" "$DST/LOGOMARCAS/governo"
mkdir -p "$DST/LOGOMARCAS/saude" "$DST/LOGOMARCAS/servico" "$DST/LOGOMARCAS/outros"

dl() {
  local url="$1" dest="$2"
  if [ -f "$dest" ]; then echo "SKIP: $dest"; return 0; fi
  curl -sf --max-time 30 "$url" -o "$dest" \
    && echo "OK:   $dest" \
    || echo "FAIL: $url"
}

echo "=== Baixando imagens de produto ==="
for f in "BR-almoxarifado.jpg" "BR-banheiro-01.JPG" "BR-deposito.jpg" \
         "BR-escritorio_com_wc.jpg" "BR-escritorio_sem_wc.jpg" \
         "page4_img6.jpg" "005.png" "003.jpg" "004.jpg" "sobre.png" "logo-p.png"; do
  dl "$SRC/$f" "$DST/$f"
done

echo "=== Baixando plantas baixas ==="
for f in "Almoxarifado.png" "Banheiro-coletivo.png" "Deposito-porta-dupla.png" \
         "Escritorio-com-banheiro.png" "Escritorio-sem-banheiro.png" "Vestiario.png"; do
  dl "$SRC/$f" "$DST/layouts/$f"
done

echo "=== Baixando logomarcas ==="
dl "$SRC/LOGOMARCAS/construcao/01.jpg" "$DST/LOGOMARCAS/construcao/01.jpg"
for i in $(seq 2 21);  do dl "$SRC/LOGOMARCAS/construcao/${i}.jpg"  "$DST/LOGOMARCAS/construcao/${i}.jpg";  done
for i in $(seq 22 42); do dl "$SRC/LOGOMARCAS/industria/${i}.jpg"   "$DST/LOGOMARCAS/industria/${i}.jpg";   done
for i in $(seq 43 45); do dl "$SRC/LOGOMARCAS/governo/${i}.jpg"     "$DST/LOGOMARCAS/governo/${i}.jpg";     done
for i in $(seq 46 49); do dl "$SRC/LOGOMARCAS/saude/${i}.jpg"       "$DST/LOGOMARCAS/saude/${i}.jpg";       done
for i in $(seq 50 73); do dl "$SRC/LOGOMARCAS/servico/${i}.jpg"     "$DST/LOGOMARCAS/servico/${i}.jpg";     done
for i in $(seq 74 87); do dl "$SRC/LOGOMARCAS/outros/${i}.jpg"      "$DST/LOGOMARCAS/outros/${i}.jpg";      done

echo ""
echo "=== Convertendo para WebP ==="
find "$DST" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | sort | while read -r f; do
  out="${f%.*}.webp"
  if [ -f "$out" ]; then echo "SKIP: $out"; rm -f "$f"; continue; fi
  cwebp -q 85 "$f" -o "$out" -quiet && rm -f "$f" && echo "WEBP: $out" || echo "FAIL: $f"
done

echo ""
echo "=== Concluído! ==="
find "$DST" -name "*.webp" | wc -l | xargs -I{} echo "{} arquivos .webp em $DST"
