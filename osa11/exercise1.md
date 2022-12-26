The programming language I picked is Python. Right off the bat I googled for the most commong linters for Python and found a popular linter named
Pylint. Pylint analyzes the code without running it and enforms the code style chosen. It also checks for errors, potential errors and code smells which are
described as indications that correlate to deeper problems in the whole system. Some other Python linters include Flake8, Pyright and Pylama. They include
more or less the same features as Pylint.

I googled for the most popular Python testing frameworks in the same way as for linters and found out a popular library called PyTest. It can be used
for unit test and even complex functional tests which involve making sure that the program works on a broader scale, according to user expectations.

Python is both an interpreted and a compiled language which means that it's first compiled into bytecode but instead of being executed by the machine
, its read and executed by some other program, usually a virtual machine which works as a CPU execution environment. So even if the material says otherwise,
 the building part of python includes compiling python code into bytecode and interpreting it with for example a virtual machine. Both can be done with the
most popular reference implementation of Python, CPython.

By googling alternatives to github actions I found names such as Azure pipelines, CircleCI, Gitlab and Buildkite.

Knowing whether a self-hosted or cloud-based setup would be better is impossible without knowing the specifics of the project. As detailed in the material,
self-hosted CI/CD environments give more flexibility and are often suitable for large scale projects, where as cloud-based environments such as Github
actions can be setup faster and with less work. So the most important thing is to know is the scale of the project.