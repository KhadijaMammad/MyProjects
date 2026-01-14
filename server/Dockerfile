# 1. Node.js-in yüngül "alpine" versiyasını seçirik (ölçüsü kiçik olur)
FROM node:18-alpine

# 2. Konteyner daxilində tətbiqin qovluğunu yaradırıq
WORKDIR /usr/src/app

# 3. Asılılıqları (dependencies) kopyalayırıq
# İlk olaraq paket fayllarını kopyalamaq lazımdır ki, kod dəyişəndə Docker hər dəfə npm install etməsin (Caching)
COPY package*.json ./

# 4. Kitabxanaları yükləyirik
RUN npm install

# 5. Layihənin qalan bütün fayllarını kopyalayırıq
COPY . .

# 6. Tətbiqin işlədiyi portu qeyd edirik (Node.js adətən 3000 və ya 8080-də işləyir)
EXPOSE 8000

# 7. Tətbiqi başladırıq
CMD ["node", "server.js"]