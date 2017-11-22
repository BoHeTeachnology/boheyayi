#ifndef __TTC_TIMESTAMP_H__
#define __TTC_TIMESTAMP_H__

#include <stdint.h>
#include <sys/time.h>

#define __must_inline__ __attribute__((always_inline))

// 由使用者负责去update
extern struct timeval __spp_g_now_tv; // session_mgr.cpp

inline void __must_inline__
__spp_do_update_tv(void)
{
    gettimeofday(&__spp_g_now_tv, NULL);
}

inline int64_t __must_inline__
__spp_get_now_ms(void)
{
    return (int64_t)__spp_g_now_tv.tv_sec * 1000 + __spp_g_now_tv.tv_usec / 1000;
}

inline time_t __must_inline__
__spp_get_now_s(void)
{
    return __spp_g_now_tv.tv_sec;
}

#endif
