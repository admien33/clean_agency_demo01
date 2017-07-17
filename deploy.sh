#!/bin/bash
set -ev && \
cd ./_site && \
git init && \
git config user.name "adm33" && \
git config user.email "adm33@gmail.com" && \
git remote add upstream "https://$GH_TOKEN@github.com/adm33/bootstrap-clean_blog.git"  && \
git fetch upstream  && \
git reset upstream/gh-pages  && \
git add -A . && \
git commit -am 'build' && \
git push -q upstream HEAD:gh-pages && \
rm -fr .git && \
cd ../
