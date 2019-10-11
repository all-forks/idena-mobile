
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
  
  NSDictionary *configDictionary = @{ @"P2P": @{ @"MaxPeers": @6, @"DialRatio": @2 },
    @"IpfsConf": @{
      @"LowWater": @5,
      @"HighWater": @10,
      @"GracePeriod": @"1m0s",
      @"ReproviderInterval": @"0",
      @"Routing": @"dhtclient",
    }
};
  
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:configDictionary options:NSJSONWritingPrettyPrinted error:nil];
  NSString *config = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  NSString* res = NodeStartMobileNode(filePath, config);
  
  resolve(res);
};

RCT_EXPORT_METHOD(
                  provideMobileKey:(NSString *)key password:(NSString *)password
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
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
