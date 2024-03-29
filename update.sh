#!/usr/bin/env sh

# 忽略错误
# set -e

# 构建
npm run docs:build

# 进入待发布的目录
cd docs/.vitepress/dist

# 如果是发布到自定义域名
echo 'themoss.eu.org' > CNAME
echo 'a16c972235862718150cccb5851babdb6b3d63c5' > 016bea2a2201ed15e394ce2848620b25.txt
# git init
git add -A
git commit -m 'web'
git push -f git@github.com:yvtian-zhankui/yvtian-zhankui.github.io.git master:pages


cd -

git add -A
git commit -m 'doc'
git push -f git@github.com:yvtian-zhankui/yvtian-zhankui.github.io.git 


# rm -rf docs/.vitepress/dist  #删除dist文件夹


# 如果部署到 https://<USERNAME>.github.io
# git push -f git@github.com:yvtian-zhankui/yvtian-zhankui.github.io.git master

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -