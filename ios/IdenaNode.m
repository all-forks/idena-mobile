
//
//  IdenaNode.m
//  IdenaPhone
//
//  Created by Aleksandr Skakovskiy on 24/01/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//
#import <Foundation/Foundation.h>
#import "IdenaNode.h"
#import "Node.framework/Versions/A/Headers/Node.h"

@implementation IdenaNode

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(start:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *filePath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
  
  NSString* res = NodeStartMobileNode(filePath, @"");
  
  resolve(res);
}

RCT_EXPORT_METHOD(
                  provideMobileKey:(NSString *)key password:(NSString *)password
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
)
{
  NSString *filePath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
  NSString *res = NodeProvideMobileKey(filePath, @"", key, password);

  resolve(res);

}

RCT_EXPORT_METHOD(readLog:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *filePath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
  NSString *appFile = [filePath stringByAppendingPathComponent:@"output.log"];
  
  NSError *error;
  NSString *fileContents = [NSString stringWithContentsOfFile:appFile encoding:NSUTF8StringEncoding error:&error];
  
  if (error){
    NSLog(@"Error reading file: %@", error.localizedDescription);
  }
  
  NSLog(@"contents: %@", fileContents);
  
  resolve(fileContents);
}

@end
