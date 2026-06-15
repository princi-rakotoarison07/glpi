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

/* components/itilobject/answer.html.twig */
class __TwigTemplate_402de8bb605394fb2b6de74e686cad19 extends Template
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
<div id=\"new-itilobject-form\" class=\"d-flex\">
   ";
        // line 34
        $context['_parent'] = $context;
        $context['_seq'] = CoreExtension::ensureTraversable(($context["timeline_itemtypes"] ?? null));
        $context['loop'] = [
          'parent' => $context['_parent'],
          'index0' => 0,
          'index'  => 1,
          'first'  => true,
        ];
        if (is_array($context['_seq']) || (is_object($context['_seq']) && $context['_seq'] instanceof \Countable)) {
            $length = count($context['_seq']);
            $context['loop']['revindex0'] = $length - 1;
            $context['loop']['revindex'] = $length;
            $context['loop']['length'] = $length;
            $context['loop']['last'] = 1 === $length;
        }
        foreach ($context['_seq'] as $context["_key"] => $context["timeline_itemtype"]) {
            // line 35
            yield "      ";
            $context["is_private"] = (((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["timeline_itemtype"], "item", [], "any", false, true, false, 35), "fields", [], "any", false, true, false, 35), "is_private", [], "array", true, true, false, 35) &&  !(null === (($_v0 = CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["timeline_itemtype"], "item", [], "any", false, false, false, 35), "fields", [], "any", false, false, false, 35)) && is_array($_v0) || $_v0 instanceof ArrayAccess ? ($_v0["is_private"] ?? null) : null)))) ? ((($_v1 = CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["timeline_itemtype"], "item", [], "any", false, false, false, 35), "fields", [], "any", false, false, false, 35)) && is_array($_v1) || $_v1 instanceof ArrayAccess ? ($_v1["is_private"] ?? null) : null)) : (false));
            // line 36
            yield "      ";
            $context["is_private_class"] = (((($tmp = ($context["is_private"] ?? null)) && $tmp instanceof Markup ? (string) $tmp : $tmp)) ? ("private-item") : (""));
            // line 37
            yield "      <div class=\"timeline-item mb-1 ms-auto ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(($context["is_private_class"] ?? null), "html", null, true);
            yield " ";
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["timeline_itemtype"], "type", [], "any", false, false, false, 37), "html", null, true);
            yield " collapse\"
        id=\"new-";
            // line 38
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["timeline_itemtype"], "class", [], "any", false, false, false, 38), "html", null, true);
            yield "-block\" aria-expanded=\"false\" data-bs-parent=\"#new-itilobject-form\"
        data-testid=\"new-";
            // line 39
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["timeline_itemtype"], "class", [], "any", false, false, false, 39), "html", null, true);
            yield "-block\">
         <div class=\"row\">
            <div class=\"col-auto todo-list-state\"></div>
            <div class=\"col-auto d-flex flex-column user-part ms-0 order-sm-last\">
               ";
            // line 43
            yield Twig\Extension\CoreExtension::include($this->env, $context, "components/user/picture.html.twig", ["users_id" => $this->extensions['Glpi\Application\View\Extension\SessionExtension']->session("glpiID")], false);
            yield "
            </div>
            <div class=\"col-12 col-sm d-flex flex-column content-part\">
               <div class=\"timeline-content t-right card mt-2\">
                  <div class=\"card-body px-1 px-xxl-3\">
                     <div class=\"clearfix\">
                        <button class=\"btn btn-sm btn-ghost-secondary float-end mb-1 close-itil-answer\"
                              data-bs-toggle=\"collapse\" data-bs-target=\"#new-";
            // line 50
            yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, $context["timeline_itemtype"], "class", [], "any", false, false, false, 50), "html", null, true);
            yield "-block\">
                           <i class=\"fs-2 ti ti-x\"></i>
                        </button>
                     </div>
                     <div>
                        ";
            // line 55
            if (CoreExtension::getAttribute($this->env, $this->source, $context["timeline_itemtype"], "template", [], "any", true, true, false, 55)) {
                // line 56
                yield "                           ";
                yield Twig\Extension\CoreExtension::include($this->env, $context, CoreExtension::getAttribute($this->env, $this->source, $context["timeline_itemtype"], "template", [], "any", false, false, false, 56), ["item" =>                 // line 57
($context["item"] ?? null), "subitem" => CoreExtension::getAttribute($this->env, $this->source,                 // line 58
$context["timeline_itemtype"], "item", [], "any", false, false, false, 58), "mention_options" =>                 // line 59
($context["mention_options"] ?? null)]);
                // line 60
                yield "
                        ";
            } else {
                // line 62
                yield "                           ";
                $context["sf_options"] = ["parent" => ($context["item"] ?? null)];
                // line 63
                yield "                           ";
                yield $this->env->getRuntime('Twig\Runtime\EscaperRuntime')->escape(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, $context["timeline_itemtype"], "item", [], "any", false, false, false, 63), "showForm", [ -1, ($context["sf_options"] ?? null)], "method", false, false, false, 63), "html", null, true);
                yield "
                        ";
            }
            // line 65
            yield "                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   ";
            ++$context['loop']['index0'];
            ++$context['loop']['index'];
            $context['loop']['first'] = false;
            if (isset($context['loop']['revindex0'], $context['loop']['revindex'])) {
                --$context['loop']['revindex0'];
                --$context['loop']['revindex'];
                $context['loop']['last'] = 0 === $context['loop']['revindex0'];
            }
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_key'], $context['timeline_itemtype'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 72
        yield "</div>
";
        yield from [];
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName(): string
    {
        return "components/itilobject/answer.html.twig";
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
        return array (  146 => 72,  126 => 65,  120 => 63,  117 => 62,  113 => 60,  111 => 59,  110 => 58,  109 => 57,  107 => 56,  105 => 55,  97 => 50,  87 => 43,  80 => 39,  76 => 38,  69 => 37,  66 => 36,  63 => 35,  46 => 34,  42 => 32,);
    }

    public function getSourceContext(): Source
    {
        return new Source("", "components/itilobject/answer.html.twig", "D:\\xampp\\htdocs\\glpi\\templates\\components\\itilobject\\answer.html.twig");
    }
}
