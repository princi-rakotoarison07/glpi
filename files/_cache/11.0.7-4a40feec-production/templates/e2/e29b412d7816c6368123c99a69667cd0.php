<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;
use Twig\TemplateWrapper;

/* pages/assets/printer.html.twig */
class __TwigTemplate_66b0fcd06128e3ebdf58d8ddb28d314c extends Template
{
    private Source $source;
    /**
     * @var array<string, Template>
     */
    private array $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->blocks = [
            'more_fields' => [$this, 'block_more_fields'],
        ];
    }

    protected function doGetParent(array $context): bool|string|Template|TemplateWrapper
    {
        // line 33
        return "generic_show_form.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        // line 34
        $macros["fields"] = $this->macros["fields"] = $this->load("components/form/fields_macros.html.twig", 34)->unwrap();
        // line 35
        $context["params"] = (((array_key_exists("params", $context) &&  !(null === $context["params"]))) ? ($context["params"]) : ([]));
        // line 33
        $this->parent = $this->load("generic_show_form.html.twig", 33);
        yield from $this->parent->unwrap()->yield($context, array_merge($this->blocks, $blocks));
    }

    // line 37
    /**
     * @return iterable<null|scalar|\Stringable>
     */
    public function block_more_fields(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        // line 38
        yield "    ";
        yield $macros["fields"]->getTemplateForMacro("macro_numberField", $context, 38, $this->getSourceContext())->macro_numberField(...["memory_size", (($_v0 = CoreExtension::getAttribute($this->env, $this->source,         // line 40
($context["item"] ?? null), "fields", [], "any", false, false, false, 40)) && is_array($_v0) || $_v0 instanceof ArrayAccess ? ($_v0["memory_size"] ?? null) : null), _n("Memory", "Memories", 1),         // line 42
($context["field_options"] ?? null)]);
        // line 43
        yield "

    ";
        // line 45
        yield $macros["fields"]->getTemplateForMacro("macro_numberField", $context, 45, $this->getSourceContext())->macro_numberField(...["init_pages_counter", (($_v1 = CoreExtension::getAttribute($this->env, $this->source,         // line 47
($context["item"] ?? null), "fields", [], "any", false, false, false, 47)) && is_array($_v1) || $_v1 instanceof ArrayAccess ? ($_v1["init_pages_counter"] ?? null) : null), __("Initial page counter"),         // line 49
($context["field_options"] ?? null)]);
        // line 50
        yield "

    ";
        // line 52
        yield $macros["fields"]->getTemplateForMacro("macro_numberField", $context, 52, $this->getSourceContext())->macro_numberField(...["last_pages_counter", (($_v2 = CoreExtension::getAttribute($this->env, $this->source,         // line 54
($context["item"] ?? null), "fields", [], "any", false, false, false, 54)) && is_array($_v2) || $_v2 instanceof ArrayAccess ? ($_v2["last_pages_counter"] ?? null) : null), __("Current counter of pages"),         // line 56
($context["field_options"] ?? null)]);
        // line 57
        yield "

    ";
        // line 59
        $context["flags_html"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
            // line 60
            yield "    ";
            yield Twig\Extension\CoreExtension::include($this->env, $context, "components/form/flags.html.twig");
            yield "
    ";
            yield from [];
        })())) ? '' : new Markup($tmp, $this->env->getCharset());
        // line 62
        yield "
    ";
        // line 63
        if ((($tmp = Twig\Extension\CoreExtension::length($this->env->getCharset(), Twig\Extension\CoreExtension::trim(($context["flags_html"] ?? null)))) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 64
            yield "        ";
            $context["flags_html"] = (("<div class=\"d-flex flex-wrap\">" . ($context["flags_html"] ?? null)) . "</div>");
            // line 65
            yield "        ";
            yield $macros["fields"]->getTemplateForMacro("macro_htmlField", $context, 65, $this->getSourceContext())->macro_htmlField(...["",             // line 67
($context["flags_html"] ?? null), _n("Port", "Ports", Session::getPluralNumber())]);
            // line 69
            yield "
    ";
        }
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "pages/assets/printer.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable(): bool
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo(): array
    {
        return array (  109 => 69,  107 => 67,  105 => 65,  102 => 64,  100 => 63,  97 => 62,  90 => 60,  88 => 59,  84 => 57,  82 => 56,  81 => 54,  80 => 52,  76 => 50,  74 => 49,  73 => 47,  72 => 45,  68 => 43,  66 => 42,  65 => 40,  63 => 38,  56 => 37,  51 => 33,  49 => 35,  47 => 34,  40 => 33,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "pages/assets/printer.html.twig", "D:\\xampp\\htdocs\\glpi\\templates\\pages\\assets\\printer.html.twig");
    }
}
