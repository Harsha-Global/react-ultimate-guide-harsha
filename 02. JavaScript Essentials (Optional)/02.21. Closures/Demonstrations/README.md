# Separate comparisons

Each folder is a complete browser-module project. Serve its own folder using Setup Guide.md.

`binding-not-snapshot` prints Before change: 90 and After change: 80. Its function reads the same outer let binding on each call; reassignment changes that binding's value. This differs from making two separate calls to createDiscount.

`outside-scope` first prints the seven successful main messages and then deliberately runs console.log(rate). The browser reports ReferenceError: rate is not defined because that parameter belongs to the factory's scope. The returned function's access does not make rate global. Keep this intentional error out of the continuing main project.
