

http://thelucid.com/2011/01/07/completely-flattening-a-git-repository/

cd /Users/jht/Desktop/photohacker
rm -rf .git
git init
git add .
git commit -m 'Day zero'
git remote add origin https://github.com/jht1900/photohacker.git
git push --force

git push --set-upstream origin master
