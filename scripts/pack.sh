#!/usr/bin/env bash
# package studio as one rpm

set -ex

DIR=`pwd`
STUDIO=$DIR/source/nebula-graph-studio

cd $STUDIO
bash ./scripts/build.sh $1 $2
cd $DIR
case $3 in
  centos7)
    bash $STUDIO/scripts/pack_CentOS.sh
    ;;
  ubuntu1604)
    bash $STUDIO/scripts/pack_Ubuntu.sh
    ;;
esac