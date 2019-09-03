NODE_PATH=github.com/idena-network/idena-go

.PHONY: build_android build_ios

build: build_android build_ios

build_android: bind_android copy_android deploy_android

bind_android:
	gomobile bind -v -o=android/node -target=android $(NODE_PATH)/node

copy_android:
	cp dist/node-sources.jar android/node-sources

deploy_android:
	cd android && ./gradlew assembleRelease
	mv android/app/build/outputs/apk/release/*.apk dist/

build_ios: bind_ios

bind_ios:
	gomobile bind -v -o=ios/Node.framework -target=ios $(NODE_PATH)/node
