#!/usr/bin/env sh

# 忽略错误
# set -e

# 构建
npm run docs:build

# 进入待发布的目录
cd docs/.vitepress/dist

# 如果是发布到自定义域名
echo 'themoss.eu.org' > CNAME

git add -A
git commit -m 'deploy'
git push -f git@github.com:yvtian-zhankui/yvtian-zhankui.github.io.git master:gh-pages


cd ../../../

git add -A
git commit -m 'deploy'
git push -f

# 如果部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -