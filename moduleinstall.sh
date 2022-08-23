echo "Enter brand name for your UI Kit package?"
read brand
echo "Enter package version you want to install"
read option
echo "//registry.npmjs.org/:_authToken=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" > .npmrc
yarn add-no-save rollup @liber-biz/crpw-ui-kit-"$brand"@"$option"
echo > .npmrc
