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

/* components/itilobject/timeline/document/post_figure_content.html.twig */
class __TwigTemplate_67483baafc1303d0e3ab6032b933aee9 extends Template
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
        $context["fk"] = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "getForeignKeyField", [], "method", false, false, false, 33);
        // line 34
        yield "
<div class=\"col-auto\">
    <div class=\"list-group-item-actions d-flex flex-column\">
        ";
        // line 37
        if ((($tmp = (($_v0 = (($_v1 = ($context["document"] ?? null)) && is_array($_v1) || $_v1 instanceof ArrayAccess ? ($_v1["item"] ?? null) : null)) && is_array($_v0) || $_v0 instanceof ArrayAccess ? ($_v0["_can_edit"] ?? null) : null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 38
            yield "            <a href=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeFormPath("Document", (($_v2 = (($_v3 = ($context["document"] ?? null)) && is_array($_v3) || $_v3 instanceof ArrayAccess ? ($_v3["item"] ?? null) : null)) && is_array($_v2) || $_v2 instanceof ArrayAccess ? ($_v2["id"] ?? null) : null)), "html", null, true);
            yield "\"
               class=\"btn btn-sm btn-ghost-secondary\" title=\"";
            // line 39
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(_x("button", "Edit"), "html", null, true);
            yield "\"
               data-bs-toggle=\"tooltip\" data-bs-placement=\"top\">
                <i class=\"ti ti-edit\"></i>
            </a>
        ";
        }
        // line 44
        yield "
        ";
        // line 45
        if ((($tmp = (($_v4 = (($_v5 = ($context["document"] ?? null)) && is_array($_v5) || $_v5 instanceof ArrayAccess ? ($_v5["item"] ?? null) : null)) && is_array($_v4) || $_v4 instanceof ArrayAccess ? ($_v4["_can_delete"] ?? null) : null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 46
            yield "            <form class=\"d-inline\" method=\"post\" action=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "getFormURL", [], "method", false, false, false, 46), "html", null, true);
            yield "\">
                <input type=\"hidden\" name=\"";
            // line 47
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["fk"] ?? null), "html", null, true);
            yield "\" value=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((($_v6 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 47)) && is_array($_v6) || $_v6 instanceof ArrayAccess ? ($_v6["id"] ?? null) : null), "html", null, true);
            yield "\">
                <input type=\"hidden\" name=\"documents_id\" value=\"";
            // line 48
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((($_v7 = (($_v8 = ($context["document"] ?? null)) && is_array($_v8) || $_v8 instanceof ArrayAccess ? ($_v8["item"] ?? null) : null)) && is_array($_v7) || $_v7 instanceof ArrayAccess ? ($_v7["id"] ?? null) : null), "html", null, true);
            yield "\">
                <input type=\"hidden\" name=\"_glpi_csrf_token\" value=\"";
            // line 49
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Session::getNewCSRFToken(), "html", null, true);
            yield "\" />
                <button type=\"submit\" class=\"btn btn-sm btn-ghost-secondary\" name=\"delete_document\"
                        title=\"";
            // line 51
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(_x("button", "Delete permanently"), "html", null, true);
            yield "\"
                        data-bs-toggle=\"tooltip\" data-bs-placement=\"top\">
                    <i class=\"ti ti-trash\"></i>
                </button>
            </form>
        ";
        }
        // line 57
        yield "
        ";
        // line 58
        if ((($tmp = (($_v9 = (($_v10 = ($context["document"] ?? null)) && is_array($_v10) || $_v10 instanceof ArrayAccess ? ($_v10["item"] ?? null) : null)) && is_array($_v9) || $_v9 instanceof ArrayAccess ? ($_v9["_can_edit"] ?? null) : null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
            // line 59
            yield "            ";
            $context["blacklisted_class"] = (((($tmp = (($_v11 = (($_v12 = ($context["document"] ?? null)) && is_array($_v12) || $_v12 instanceof ArrayAccess ? ($_v12["item"] ?? null) : null)) && is_array($_v11) || $_v11 instanceof ArrayAccess ? ($_v11["is_blacklisted"] ?? null) : null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? ("red") : (""));
            // line 60
            yield "            ";
            $context["blacklisted_title"] = (((($tmp = (($_v13 = (($_v14 = ($context["document"] ?? null)) && is_array($_v14) || $_v14 instanceof ArrayAccess ? ($_v14["item"] ?? null) : null)) && is_array($_v13) || $_v13 instanceof ArrayAccess ? ($_v13["is_blacklisted"] ?? null) : null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? (_x("button", "Remove from import exclusion list")) : (_x("button", "Add to import exclusion list")));
            // line 61
            yield "            ";
            $context["blacklisted_value"] = (((($tmp = (($_v15 = (($_v16 = ($context["document"] ?? null)) && is_array($_v16) || $_v16 instanceof ArrayAccess ? ($_v16["item"] ?? null) : null)) && is_array($_v15) || $_v15 instanceof ArrayAccess ? ($_v15["is_blacklisted"] ?? null) : null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? (0) : (1));
            // line 62
            yield "            <form class=\"d-inline\" method=\"post\" action=\"";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape($this->extensions['Glpi\Application\View\Extension\ItemtypeExtension']->getItemtypeFormPath("Document"), "html", null, true);
            yield "\">
                <input type=\"hidden\" name=\"id\" value=\"";
            // line 63
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape((($_v17 = (($_v18 = ($context["document"] ?? null)) && is_array($_v18) || $_v18 instanceof ArrayAccess ? ($_v18["item"] ?? null) : null)) && is_array($_v17) || $_v17 instanceof ArrayAccess ? ($_v17["id"] ?? null) : null), "html", null, true);
            yield "\">
                <input type=\"hidden\" name=\"is_blacklisted\" value=\"";
            // line 64
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["blacklisted_value"] ?? null), "html", null, true);
            yield "\">
                <input type=\"hidden\" name=\"_glpi_csrf_token\" value=\"";
            // line 65
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(Session::getNewCSRFToken(), "html", null, true);
            yield "\" />
                <button type=\"submit\" class=\"btn btn-sm btn-ghost-secondary\" name=\"update\"
                        title=\"";
            // line 67
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["blacklisted_title"] ?? null), "html", null, true);
            yield "\"
                        data-bs-toggle=\"tooltip\" data-bs-placement=\"top\">
                    <i class=\"ti ti-ban ";
            // line 69
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["blacklisted_class"] ?? null), "html", null, true);
            yield "\"></i>
                </button>
            </form>
        ";
        }
        // line 73
        yield "    </div>
</div>
";
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "components/itilobject/timeline/document/post_figure_content.html.twig";
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
        return array (  145 => 73,  138 => 69,  133 => 67,  128 => 65,  124 => 64,  120 => 63,  115 => 62,  112 => 61,  109 => 60,  106 => 59,  104 => 58,  101 => 57,  92 => 51,  87 => 49,  83 => 48,  77 => 47,  72 => 46,  70 => 45,  67 => 44,  59 => 39,  54 => 38,  52 => 37,  47 => 34,  45 => 33,  42 => 32,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "components/itilobject/timeline/document/post_figure_content.html.twig", "C:\\xampp\\htdocs\\glpi\\templates\\components\\itilobject\\timeline\\document\\post_figure_content.html.twig");
    }
}
