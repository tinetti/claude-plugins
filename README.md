# Claude Plugins

John Tinetti's Claude Code plugin marketplace.

## Using this marketplace

Add the marketplace to Claude Code:

```bash
/plugin marketplace add tinetti/claude-plugins
```

Then install a plugin:

```bash
/plugin install waybill@tinetti
```

## Plugins

- [waybill](https://github.com/tinetti/waybill) — A leg route with pluggable carriers: one command
  names the leg a change is on, the command that runs it next, and the model that command wants.
  Reads every leg's stamp off repository reality — a branch, a bay, a file, an exit code — so there
  is no state file to keep in sync and a leg done by hand counts the same as one done through the
  tool.

Each plugin lives in its own repository. This repository holds only the marketplace manifest that
points at them, so a plugin is released by tagging its own repo rather than by touching this one.

## License

MIT — see [LICENSE](LICENSE).
