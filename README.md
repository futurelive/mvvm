// 新建 tag
git tag <tag name>

// 查看 tag
git tag -l

// push tag
git push origin <tag name>

// 切换到 tag
git checkout tags/<tag name>

// 本地删除tag
git tag -d <tag name>

// 本地tag删除了，再执行该句，删除线上tag
git push origin :refs/tags/<tag name>