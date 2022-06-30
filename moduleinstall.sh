echo "Are you sure to install UI Kit package for $npm_package_brand brand(y/N)?"
read option
if [ "$option" = "N" ] || [ "$option" = "n" ]
then
echo "exiting...."
exit 1
else
echo "Enter package version you want to install"
read option
yarn add @liber-biz/crpw-ui-kit-"$npm_package_brand"@"$option"
fi