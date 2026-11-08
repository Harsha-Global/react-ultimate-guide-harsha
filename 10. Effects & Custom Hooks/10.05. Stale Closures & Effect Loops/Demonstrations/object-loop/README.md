# Deliberately bounded object-dependency loop

The options object is created again on every render. The Effect depends on it and also changes state, so setups repeat until the safety cap. Move the constant object outside App, keep it in the dependency list, and reload. Development StrictMode can add its own setup/cleanup cycle; compare the repeated trend rather than promising one exact count.
