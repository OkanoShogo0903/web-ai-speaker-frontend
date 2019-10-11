export GO111MODULE := on

GOOS := linux
GOARCH := amd64

build:
	npm run build
run:
	npm run serve
