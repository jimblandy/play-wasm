#![no_std]

#[no_mangle]
pub extern "C" fn step(i: u32) -> u32 {
    if i & 1 == 0 {
        i / 2
    } else {
        i * 3 + 1
    }
}

#[panic_handler]
fn panic(_info: &core::panic::PanicInfo) -> ! {
    loop {}
}
