//
//  SwipePlugin.m
//  App
//
//  Created by Aleksandr Stekolshchikov on 17.03.2022.
//

#import <Capacitor/Capacitor.h>

CAP_PLUGIN(SwipeBackPlugin, "SwipeBack",
    CAP_PLUGIN_METHOD(enable, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(disable, CAPPluginReturnPromise);
)
