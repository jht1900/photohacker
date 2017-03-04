
```bash
http://thelucid.com/2011/01/07/completely-flattening-a-git-repository/

https://github.com/jht1900/photohacker-prep.git

cd /Users/jht/Desktop/photohacker
rm -rf .git
git init
git add .
git commit -m 'Day zero'
git remote add origin https://github.com/jht1900/photohacker.git
git push --force --set-upstream origin master

Username for 'https://github.com': jht1900
Password for 'https://jht1900@github.com':
To https://github.com/jht1900/photohacker.git
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'https://github.com/jht1900/photohacker.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```
