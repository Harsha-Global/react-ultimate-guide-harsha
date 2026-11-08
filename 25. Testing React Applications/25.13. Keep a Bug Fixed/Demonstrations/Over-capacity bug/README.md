# Deliberate over-capacity bug

Start here before writing the new ninth-attendee regression test. This copy changes only the attendeeAdded guard from >=8 to >8 and retains the earlier four reducer tests, which do not protect this boundary. After adding the test shown in Code.md, it must fail. The neighboring Failing regression copy contains the test already added; the lecture main contains the repaired guard and passing test.
