var module, instance;
(async function play_wasm_async_body() {
    const response = await fetch('play_wasm.wasm');
    const buffer = await response.arrayBuffer();
    module = new WebAssembly.Module(buffer);
    console.log(module);
    console.log("module imports: ", WebAssembly.Module.imports(module));    
    console.log("module exports: ", WebAssembly.Module.exports(module));
    const imports = { "spoonfed": { log_wasm_string } };
    instance = new WebAssembly.Instance(module, imports);
    console.log("instance.exports: ", instance.exports);
    console.log("step(10) = " + instance.exports.step(10));
    console.log("step(11) = " + instance.exports.step(11));
})();

function log_wasm_string(ptr, len) {
    console.log(`Called from wasm: complicated(${ptr}, ${len})\n\nstack:\n${(new Error).stack}`);
    console.log(`String contents: ${fetch_wasm_string(instance, ptr, len)}`);
}


const utf8_decoder = new TextDecoder();
function fetch_wasm_string(instance, ptr, len) {
    return utf8_decoder.decode(new DataView(instance.exports.memory.buffer, ptr, len))
}
