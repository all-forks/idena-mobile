
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
  
  NSDictionary *configDictionary = @{
   @"P2P": @{
       @"MaxPeers": @6,
       @"DialRatio": @1
   },
   @"IpfsConf": @{
       @"LowWater": @5,
       @"HighWater": @10,
       @"GracePeriod": @"1m0s",
       @"ReproviderInterval": @"0",
       @"Routing": @"dhtclient"
   },
 };

  #if DEBUG
    configDictionary = @{
      @"P2P": @{
          @"MaxPeers": @6,
          @"DialRatio": @2,
          @"BootstrapNodes": @[@"enode://f233870d710a0171378bc99d0ee3104c996104c8737d3befc9179e8f126e31575c429243a9224f853d4582fe5fb5bb7f72cbbe44412e3afc865ef3dfab12d2df@127.0.0.1:40404"],
          @"ListenAddr": @":40465"
      },
      @"IpfsConf": @{
        @"LowWater": @5,
        @"HighWater": @10,
        @"GracePeriod": @"1m0s",
        @"ReproviderInterval": @"0",
        @"Routing": @"dhtclient",
        @"BootNodes": @[@"/ip4/127.0.0.1/tcp/40406/ipfs/QmUYuojbcxPdhnSxVEbgMeDSfuJFtuVG4ogUTUMHoRtfA9"],
        @"IpfsPort": @40466,
      },
      @"RPC": @{@"HTTPPort": @9010},
      @"GenesisConf": @{
        @"GodAddress": @"0x2bf059d391f479f4a5c494f98a669bc72c4a22fb",
        @"FirstCeremonyTime": @1573124400
      },
      @"Consensus": @{
        @"ProposerTheshold": @0.001
      },
      @"Network": @3
    };
  #endif

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
  
  NSDictionary *configDictionary = @{
    @"P2P": @{
        @"MaxPeers": @6,
        @"DialRatio": @1
    },
    @"IpfsConf": @{
        @"LowWater": @5,
        @"HighWater": @10,
        @"GracePeriod": @"1m0s",
        @"ReproviderInterval": @"0",
        @"Routing": @"dhtclient"
    },
  };

   #if DEBUG
     configDictionary = @{
       @"P2P": @{
           @"MaxPeers": @6,
           @"DialRatio": @2,
           @"BootstrapNodes": @[@"enode://f233870d710a0171378bc99d0ee3104c996104c8737d3befc9179e8f126e31575c429243a9224f853d4582fe5fb5bb7f72cbbe44412e3afc865ef3dfab12d2df@127.0.0.1:40404"],
           @"ListenAddr": @":40465"
       },
       @"IpfsConf": @{
         @"LowWater": @5,
         @"HighWater": @10,
         @"GracePeriod": @"1m0s",
         @"ReproviderInterval": @"0",
         @"Routing": @"dhtclient",
         @"BootNodes": @[@"/ip4/127.0.0.1/tcp/40406/ipfs/QmUYuojbcxPdhnSxVEbgMeDSfuJFtuVG4ogUTUMHoRtfA9"],
         @"IpfsPort": @40466,
       },
       @"RPC": @{@"HTTPPort": @9010},
       @"GenesisConf": @{
         @"GodAddress": @"0x2bf059d391f479f4a5c494f98a669bc72c4a22fb",
         @"FirstCeremonyTime": @1573124400
       },
       @"Consensus": @{
         @"ProposerTheshold": @0.001
       },
       @"Network": @3
     };
   #endif

  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:configDictionary options:NSJSONWritingPrettyPrinted error:nil];
  NSString *config = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  NSString *filePath = [NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) firstObject];
  NSString *res = NodeProvideMobileKey(filePath, config, key, password);
  
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
