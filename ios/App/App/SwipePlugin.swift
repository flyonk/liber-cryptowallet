import Capacitor

@objc(SwipeBackPlugin)
public class SwipeBackPlugin: CAPPlugin {
    @objc func enable(_ call: CAPPluginCall) {
        self.bridge?.webView?.allowsBackForwardNavigationGestures = true
        call.resolve([ "error": 0 ]);
    }
        
    @objc func disable(_ call: CAPPluginCall) {
        self.bridge?.webView?.allowsBackForwardNavigationGestures = false
        call.resolve([ "error": 0 ]);
    }
}
