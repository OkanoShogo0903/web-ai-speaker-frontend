# 開発環境
FROM node:12.6.0-alpine
#FROM node:10.12-alpine as build-stage
# コンテナ内に/appディレクトリを作り
WORKDIR /app
# ローカルのwebディレクトリにあるファイルを全てコンテナにコピー
COPY . .

# 依存モジュールをインストールします
RUN npm install

CMD npm run serve
