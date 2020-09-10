/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
// 4.1.2 Reflect.defineMetadata ( metadataKey, metadataValue, target, propertyKey )
// https://rbuckton.github.io/reflect-metadata/#reflect.definemetadata

import "../Reflect.ts";
import { assertEquals, assertThrows } from "../deps_dev.ts";

Deno.test({
  name: "[Reflect.defineMetadata] InvalidTarget",
  fn(): void {
    assertThrows(
      () => Reflect.defineMetadata("key", "value", undefined),
      TypeError,
    );
  },
});

Deno.test({
  name: "[Reflect.defineMetadata] ValidTargetWithoutTargetKey",
  fn(): void {
    try {
      Reflect.defineMetadata("key", "value", {});
    } catch (e) {
      assertEquals(e, null);
    }
    assertEquals(true, true);
  },
});

Deno.test({
  name: "[Reflect.ValidTargetWithTargetKey] ",
  fn(): void {
    try {
      Reflect.defineMetadata("key", "value", {}, "name");
    } catch (e) {
      assertEquals(e, null);
    }
    assertEquals(true, true);
  },
});
