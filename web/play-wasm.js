var module, instance;
(async function play_wasm_async_body() {
    const response = await fetch('play_wasm.wasm');
    const buffer = await response.arrayBuffer();
    module = new WebAssembly.Module(buffer);
    console.log(module);
    console.log("module imports: ", WebAssembly.Module.imports(module));    
    console.log("module exports: ", WebAssembly.Module.exports(module));
    const imports = { "spoonfed": { complicated } };
    instance = new WebAssembly.Instance(module, imports);
    console.log("instance.exports: ", instance.exports);
    console.log("step(10) = " + instance.exports.step(10));
    console.log("step(11) = " + instance.exports.step(11));
})();

function complicated(i) {
    console.log(`Called from wasm: complicated(${i})\n\nstack:\n${(new Error).stack}`);
    return i * 3 + 1;
}
