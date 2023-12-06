if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/marko/.gradle/caches/transforms-3/82fc49c66eb188cd9d470265c2f5633f/transformed/jetified-hermes-android-0.72.6-debug/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/marko/.gradle/caches/transforms-3/82fc49c66eb188cd9d470265c2f5633f/transformed/jetified-hermes-android-0.72.6-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

