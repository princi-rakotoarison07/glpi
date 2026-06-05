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

/* components/itilobject/timeline/sub_documents.html.twig */
class __TwigTemplate_03c6799e4f3415c887e2f05ecbaa8b42 extends Template
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
        $context["documents"] = (((CoreExtension::getAttribute($this->env, $this->source, ($context["entry"] ?? null), "documents", [], "array", true, true, false, 33) &&  !(null === (($_v0 = ($context["entry"] ?? null)) && is_array($_v0) || $_v0 instanceof ArrayAccess ? ($_v0["documents"] ?? null) : null)))) ? ((($_v1 = ($context["entry"] ?? null)) && is_array($_v1) || $_v1 instanceof ArrayAccess ? ($_v1["documents"] ?? null) : null)) : ([]));
        // line 34
        $context["fk"] = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "getForeignKeyField", [], "method", false, false, false, 34);
        // line 35
        yield "<div class=\"list-group list-group-hoverable sub-documents\">
   ";
        // line 36
        $context["media_docs"] = Twig\Extension\CoreExtension::filter($this->env, ($context["documents"] ?? null), function ($__d__) use ($context, $macros) { $context["d"] = $__d__; return ((((CoreExtension::getAttribute($this->env, $this->source, ($context["d"] ?? null), "_is_image", [], "array", true, true, false, 36) &&  !(null === (($_v2 = ($context["d"] ?? null)) && is_array($_v2) || $_v2 instanceof ArrayAccess ? ($_v2["_is_image"] ?? null) : null)))) ? ((($_v3 = ($context["d"] ?? null)) && is_array($_v3) || $_v3 instanceof ArrayAccess ? ($_v3["_is_image"] ?? null) : null)) : (false)) || (is_string($_v4 = (($_v6 = (($_v7 = ($context["d"] ?? null)) && is_array($_v7) || $_v7 instanceof ArrayAccess ? ($_v7["item"] ?? null) : null)) && is_array($_v6) || $_v6 instanceof ArrayAccess ? ($_v6["mime"] ?? null) : null)) && is_string($_v5 = "video") && str_starts_with($_v4, $_v5))); });
        // line 37
        yield "   ";
        $context["other_docs"] = Twig\Extension\CoreExtension::filter($this->env, ($context["documents"] ?? null), function ($__d__) use ($context, $macros) { $context["d"] = $__d__; return  !((((CoreExtension::getAttribute($this->env, $this->source, ($context["d"] ?? null), "_is_image", [], "array", true, true, false, 37) &&  !(null === (($_v8 = ($context["d"] ?? null)) && is_array($_v8) || $_v8 instanceof ArrayAccess ? ($_v8["_is_image"] ?? null) : null)))) ? ((($_v9 = ($context["d"] ?? null)) && is_array($_v9) || $_v9 instanceof ArrayAccess ? ($_v9["_is_image"] ?? null) : null)) : (false)) || (is_string($_v10 = (($_v12 = (($_v13 = ($context["d"] ?? null)) && is_array($_v13) || $_v13 instanceof ArrayAccess ? ($_v13["item"] ?? null) : null)) && is_array($_v12) || $_v12 instanceof ArrayAccess ? ($_v12["mime"] ?? null) : null)) && is_string($_v11 = "video") && str_starts_with($_v10, $_v11))); });
        // line 38
        yield "
   ";
        // line 39
        if ((Twig\Extension\CoreExtension::length($this->env->getCharset(), ($context["media_docs"] ?? null)) > 0)) {
            // line 40
            yield "      ";
            $context["imgs"] = [];
            // line 41
            yield "      ";
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable(($context["media_docs"] ?? null));
            foreach ($context['_seq'] as $context["_key"] => $context["document"]) {
                // line 42
                yield "         ";
                $context["docpath"] = $this->extensions['Glpi\Application\View\Extension\RoutingExtension']->path(((((("front/document.send.php?docid=" . (($_v14 = (($_v15 = $context["document"]) && is_array($_v15) || $_v15 instanceof ArrayAccess ? ($_v15["item"] ?? null) : null)) && is_array($_v14) || $_v14 instanceof ArrayAccess ? ($_v14["id"] ?? null) : null)) . "&") . ($context["fk"] ?? null)) . "=") . (($_v16 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 42)) && is_array($_v16) || $_v16 instanceof ArrayAccess ? ($_v16["id"] ?? null) : null)));
                // line 43
                yield "         ";
                $context["delete_link"] = ((((((CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "getFormURL", [], "method", false, false, false, 43) . "?delete_document&documents_id=") . (($_v17 = (($_v18 = $context["document"]) && is_array($_v18) || $_v18 instanceof ArrayAccess ? ($_v18["item"] ?? null) : null)) && is_array($_v17) || $_v17 instanceof ArrayAccess ? ($_v17["id"] ?? null) : null)) . "&") . ($context["fk"] ?? null)) . "=") . (($_v19 = CoreExtension::getAttribute($this->env, $this->source, ($context["item"] ?? null), "fields", [], "any", false, false, false, 43)) && is_array($_v19) || $_v19 instanceof ArrayAccess ? ($_v19["id"] ?? null) : null));
                // line 44
                yield "
         ";
                // line 45
                $context["post_figure_content"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
                    // line 46
                    yield "            ";
                    yield Twig\Extension\CoreExtension::include($this->env, $context, "components/itilobject/timeline/document/post_figure_content.html.twig", ["item" =>                     // line 47
($context["item"] ?? null), "document" =>                     // line 48
$context["document"]], false);
                    // line 49
                    yield "
         ";
                    yield from [];
                })())) ? '' : new Markup($tmp, $this->env->getCharset());
                // line 51
                yield "
         ";
                // line 52
                if ((($tmp = (($_v20 = $context["document"]) && is_array($_v20) || $_v20 instanceof ArrayAccess ? ($_v20["_is_image"] ?? null) : null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) {
                    // line 53
                    yield "            ";
                    $context["imgs"] = Twig\Extension\CoreExtension::merge(($context["imgs"] ?? null), [["title" => "", "thumbnail_src" => (                    // line 55
($context["docpath"] ?? null) . "&context=timeline"), "thumbnail_w" => "auto", "thumbnail_h" => "auto", "src" =>                     // line 58
($context["docpath"] ?? null), "w" => (($_v21 = (($_v22 =                     // line 59
$context["document"]) && is_array($_v22) || $_v22 instanceof ArrayAccess ? ($_v22["_size"] ?? null) : null)) && is_array($_v21) || $_v21 instanceof ArrayAccess ? ($_v21[0] ?? null) : null), "h" => (($_v23 = (($_v24 =                     // line 60
$context["document"]) && is_array($_v24) || $_v24 instanceof ArrayAccess ? ($_v24["_size"] ?? null) : null)) && is_array($_v23) || $_v23 instanceof ArrayAccess ? ($_v23[1] ?? null) : null), "img_class" => "shadow ", "gallery_item_class" => "list-group-item border-0 d-flex", "post_figure_content" =>                     // line 63
($context["post_figure_content"] ?? null)]]);
                    // line 65
                    yield "         ";
                } else {
                    // line 66
                    yield "            ";
                    $context["video_html"] = ('' === $tmp = \Twig\Extension\CoreExtension::captureOutput((function () use (&$context, $macros, $blocks) {
                        // line 67
                        yield "               <span class=\"d-flex justify-content-center align-items-center mt-5\">
                  <video controls=\"controls\" width=\"90%\" src=\"";
                        // line 68
                        yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["docpath"] ?? null), "html", null, true);
                        yield "\"></video>
               </span>
            ";
                        yield from [];
                    })())) ? '' : new Markup($tmp, $this->env->getCharset());
                    // line 71
                    yield "            ";
                    $context["imgs"] = Twig\Extension\CoreExtension::merge(($context["imgs"] ?? null), [["title" => "", "_video" => true, "html" =>                     // line 74
($context["video_html"] ?? null), "img_class" => "shadow", "gallery_item_class" => "list-group-item border-0 d-flex", "post_figure_content" =>                     // line 77
($context["post_figure_content"] ?? null)]]);
                    // line 79
                    yield "         ";
                }
                // line 80
                yield "      ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_key'], $context['document'], $context['_parent']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 81
            yield "      ";
            yield from $this->load("components/photoswipe.html.twig", 81)->unwrap()->yield(CoreExtension::merge($context, ["imgs" =>             // line 82
($context["imgs"] ?? null), "gallery_type" => "horizontal", "controls" => ["close" => true, "zoom" => true]]));
            // line 86
            yield "   ";
        }
        // line 87
        yield "
   ";
        // line 88
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(($context["other_docs"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["document"]) {
            // line 89
            yield "      <div class=\"list-group-item border-0\">
          ";
            // line 90
            yield Twig\Extension\CoreExtension::include($this->env, $context, "components/itilobject/timeline/document/document_list_item.html.twig", ["item" =>             // line 91
($context["item"] ?? null), "entry_i" => (($_v25 =             // line 92
$context["document"]) && is_array($_v25) || $_v25 instanceof ArrayAccess ? ($_v25["item"] ?? null) : null)], false);
            // line 93
            yield "
      </div>
   ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['document'], $context['_parent']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 96
        yield "</div>
";
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "components/itilobject/timeline/sub_documents.html.twig";
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
        return array (  163 => 96,  155 => 93,  153 => 92,  152 => 91,  151 => 90,  148 => 89,  144 => 88,  141 => 87,  138 => 86,  136 => 82,  134 => 81,  128 => 80,  125 => 79,  123 => 77,  122 => 74,  120 => 71,  113 => 68,  110 => 67,  107 => 66,  104 => 65,  102 => 63,  101 => 60,  100 => 59,  99 => 58,  98 => 55,  96 => 53,  94 => 52,  91 => 51,  86 => 49,  84 => 48,  83 => 47,  81 => 46,  79 => 45,  76 => 44,  73 => 43,  70 => 42,  65 => 41,  62 => 40,  60 => 39,  57 => 38,  54 => 37,  52 => 36,  49 => 35,  47 => 34,  45 => 33,  42 => 32,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "components/itilobject/timeline/sub_documents.html.twig", "C:\\xampp\\htdocs\\glpi\\templates\\components\\itilobject\\timeline\\sub_documents.html.twig");
    }
}
