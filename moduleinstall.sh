echo "Enter brand name for your UI Kit package?"
read brand
echo "Enter package version you want to install"
read option
yarn add-no-save rollup @liber-biz/crpw-ui-kit-"$brand"@"$option"