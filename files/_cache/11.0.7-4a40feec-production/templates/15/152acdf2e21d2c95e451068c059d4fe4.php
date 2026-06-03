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

/* install/update.need_update.html.twig */
class __TwigTemplate_77d10f3afd5c32aefbe37a5e9e55c964 extends Template
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

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = []): iterable
    {
        $macros = $this->macros;
        // line 32
        yield "
";
        // line 33
        $macros["fields"] = $this->macros["fields"] = $this->load("components/form/fields_macros.html.twig", 33)->unwrap();
        // line 34
        yield "
";
        // line 35
        $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call(["Html", "nullHeader"], [__("Update needed")]);
        // line 36
        yield "<div class=\"container-fluid mb-4\">
    <div class=\"row justify-content-evenly\">
        <div class=\"col-12 col-xxl-6\">
            <div class=\"card text-center mb-4\">
                ";
        // line 40
        yield from $this->load("install/blocks/requirements_table.html.twig", 40)->unwrap()->yield(CoreExtension::merge($context, ["requirements" => ($context["core_requirements"] ?? null)]));
        // line 41
        yield "                ";
        if ((CoreExtension::getAttribute($this->env, $this->source, ($context["core_requirements"] ?? null), "hasMissingMandatoryRequirements", [], "method", false, false, false, 41) || CoreExtension::getAttribute($this->env, $this->source, ($context["core_requirements"] ?? null), "hasMissingOptionalRequirements", [], "method", false, false, false, 41))) {
            // line 42
            yield "                    <form action=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\RoutingExtension']->path("index.php"), "html", null, true);
            yield "\" method=\"post\">
                        <button type=\"submit\" class=\"btn btn-primary\">
                            <i class=\"ti ti-reload\"></i>";
            // line 44
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("Try again"), "html", null, true);
            yield "
                        </button>
                    </form>
                ";
        }
        // line 48
        yield "                ";
        if ((($tmp =  !CoreExtension::getAttribute($this->env, $this->source, ($context["core_requirements"] ?? null), "hasMissingMandatoryRequirements", [], "method", false, false, false, 48)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 49
            yield "                    ";
            if ((($tmp =  !($context["is_outdated"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
                // line 50
                yield "                        <form method=\"post\" action=\"";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\RoutingExtension']->path("install/update.php"), "html", null, true);
                yield "\" class=\"p-2\">
                            ";
                // line 51
                yield $macros["fields"]->getTemplateForMacro("macro_csrfField", $context, 51, $this->getSourceContext())->macro_csrfField(...[]);
                yield "
                            <input type=\"hidden\" name=\"from_update\" value=\"1\">
                            ";
                // line 53
                if ((($tmp =  !($context["is_stable_release"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
                    // line 54
                    yield "                                ";
                    yield from $this->load("install/agree_unstable.html.twig", 54)->unwrap()->yield(CoreExtension::toArray(["is_dev" => ($context["is_dev_version"] ?? null)]));
                    // line 55
                    yield "                            ";
                }
                // line 56
                yield "                            <p class=\"my-2 alert alert-important alert-warning\">
                                ";
                // line 57
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("The GLPI codebase has been updated. The update of the GLPI database is necessary."), "html", null, true);
                yield "
                            </p>
                            <button type=\"submit\" name=\"continue\" value=\"1\" class=\"btn btn-primary\">
                                <i class=\"ti ti-check\"></i>";
                // line 60
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(_x("button", "Upgrade"), "html", null, true);
                yield "
                            </button>
                        </form>
                    ";
            } else {
                // line 64
                yield "                        <p class=\"mt-2 mb-n2 alert alert-important alert-warning\">
                            ";
                // line 65
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(__("You are trying to use GLPI with outdated files compared to the version of the database. Please install the correct GLPI files corresponding to the version of your database."), "html", null, true);
                yield "
                        </p>
                    ";
            }
            // line 68
            yield "                ";
        }
        // line 69
        yield "            </div>
        </div>
    </div>
</div>

";
        // line 74
        $this->extensions['Glpi\Application\View\Extension\PhpExtension']->call(["Html", "nullFooter"]);
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "install/update.need_update.html.twig";
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
        return array (  135 => 74,  128 => 69,  125 => 68,  119 => 65,  116 => 64,  109 => 60,  103 => 57,  100 => 56,  97 => 55,  94 => 54,  92 => 53,  87 => 51,  82 => 50,  79 => 49,  76 => 48,  69 => 44,  63 => 42,  60 => 41,  58 => 40,  52 => 36,  50 => 35,  47 => 34,  45 => 33,  42 => 32,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "install/update.need_update.html.twig", "D:\\xampp\\htdocs\\glpi\\templates\\install\\update.need_update.html.twig");
    }
}
