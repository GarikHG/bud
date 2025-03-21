#!/bin/bash

set -e

WORKFLOW_FILE=./.github/workflows/main.yml
WORKFLOW_CHECKSUM=41dc361ce840e2dfb3dcaea5875c7f33

md5sum --status --strict -c <(echo $WORKFLOW_CHECKSUM  $WORKFLOW_FILE)

echo Install
yarn install --immutable

echo Build
yarn kjo build

echo Lint
yarn kjo lint --eslint --skypack

echo Test
yarn kjo test
