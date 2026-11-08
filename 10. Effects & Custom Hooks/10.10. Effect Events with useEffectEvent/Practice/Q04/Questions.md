# Q04 — State and Effects

Optional review quiz after Section 10. Choose one answer for each question, then consult Answers.md. The planned Udemy quiz is separate from these local resources.

## 1. Where should Focus Desk's open-task count live?

A. In a second state value, synchronized from the task array by an Effect
B. As a calculation from the current task array during rendering
C. In localStorage, updated by the Add button
D. In the title Effect's cleanup function

## 2. The tab-title Effect reads taskTitle and mode, but lists only [taskTitle]. What is the correct repair?

A. Remove the dependency list to hide the warning
B. Include mode, because its changes must update the title
C. Move mode into a global variable
D. Use an Effect Event to hide mode

## 3. In development, one keyboard shortcut begins toggling twice after a timer panel remount. What should you inspect first?

A. Whether cleanup removes the exact listener installed by that setup
B. Whether StrictMode should be removed
C. Whether the task list should be global state
D. Whether every second key press should be ignored

## 4. A faulty interval callback captured remainingSeconds=300 and repeatedly sets it to remainingSeconds-1. Why does the clock stall at 299?

A. Every interval callback receives a new render's binding automatically
B. The callback keeps the binding from the setup that created it
C. The browser cannot run more than one interval tick
D. A new task selection always pauses the timer

## 5. Two TimerPanel instances each call useFocusSession. One is unmounted. What should happen?

A. Both timers reset because a Hook definition shares state
B. The removed timer cleans up; the other retains its own state and lifetime
C. The second timer must stop until the first returns
D. The removed timer should continue ticking in the background

## 6. The timer schedule depends on running and remainingSeconds, while completion text should use the latest displayName. Which design fits?

A. Omit all dependencies and use the initial name
B. Remount TimerPanel for each keystroke
C. Keep the scheduling dependencies and read displayName inside an Effect Event called by the timeout callback
D. Pass the Effect Event to a child button as its click handler
