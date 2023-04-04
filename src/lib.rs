#[no_mangle]
pub extern "C" fn step(i: u32) -> u32 {
    log_string(&format!("step called with {}", i));
    if i & 1 == 0 {
        i / 2
    } else {
        i * 3 + 1
    }
}

fn log_string(s: &str) {
    unsafe {
        log_wasm_string(s.as_ptr() as u32, s.len() as u32);
    }
}

#[link(wasm_import_module = "spoonfed")]
extern "C" {
    fn log_wasm_string(ptr: u32, len: u32);
}
