var module, instance;
(async function () {
    const response = await fetch('play_wasm.wasm');
    const buffer = await response.arrayBuffer();
    module = new WebAssembly.Module(buffer);
    instance = new WebAssembly.Instance(module);
    console.log(WebAssembly.Module.exports(module));
    console.log(instance.exports);
    console.log("step(10) = " + instance.exports.step(10));
})();
